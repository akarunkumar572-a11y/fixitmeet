const { Mistral } = require('@mistralai/mistralai');
const { Service, User, Appointment, AiMemory } = require('../config/pg_models');

const apiKey = process.env.MISTRAL_API_KEY;
const client = new Mistral({ apiKey });

/**
 * @desc    Chat with AI for booking or help
 * @route   POST /api/ai/chat
 * @access  Private
 */
const chatWithAI = async (req, res) => {
    const { message } = req.body;
    const userId = req.user.id; // Corrected to use UUID from Sequelize user

    if (!message) {
        return res.status(400).json({ message: 'Message is required' });
    }

    try {
        console.log(`[AI] Processing message from user ${userId}: "${message}"`);

        // 1. Get/Create AI Memory for user from Postgres
        let memory = await AiMemory.findOne({ where: { userId } });
        if (!memory) {
            console.log(`[AI] Creating new memory record for user ${userId}`);
            memory = await AiMemory.create({ userId, chatHistory: [], preferences: '' });
        }

        // 2. Fetch context (Services/Pros)
        const services = await Service.findAll({ where: { status: 'active' }, limit: 10 });
        const pros = await User.findAll({ where: { role: 'pro', status: 'active' }, limit: 10 });

        const context = `
            Available Services: ${JSON.stringify(services.map(s => ({ name: s.name, category: s.category, price: s.price, duration: s.duration })))}
            Available Professionals: ${JSON.stringify(pros.map(p => ({ name: p.name, specialization: p.specialization, phone: p.phone })))}
            User Previous Note/Preferences: ${memory.preferences || 'No previous history recorded yet.'}
            Today's Date: ${new Date().toLocaleDateString()}
        `;

        // 3. Prepare system prompt
        const systemPrompt = `
            You are FixitMeet AI, a smart assistant for a service booking platform.
            Your goal is to help users find services, choose professionals, and book appointments.
            
            Be concise, professional, and friendly.
            
            Context about the current system state:
            ${context}
            
            Guidelines:
            - If you detect the user wants to book, suggest the best service/pro from the context matching their needs.
            - "Memory": Remember and acknowledge what the user said in the past if it's in the 'User Previous Note'.
            - If they explicitly mention a preference (e.g., "I prefer video calls"), acknowledge it.
            - If the user asks for a price or duration, check the context info.
            - IMPORTANT: If they are ready to book, guide them to specify: Service Name, Professional Name, Date, and Time.
        `;

        // 4. Build message history (Mistral expects roles like 'system', 'user', 'assistant')
        const previousMessages = (memory.chatHistory || []).slice(-10).map(msg => ({
            role: msg.role === 'assistant' ? 'assistant' : 'user', 
            content: msg.content
        }));

        const messages = [
            { role: 'system', content: systemPrompt },
            ...previousMessages,
            { role: 'user', content: message }
        ];

        // 5. Query Mistral
        console.log(`[AI] Calling Mistral API...`);
        const response = await client.chat.complete({
            model: 'mistral-large-latest',
            messages: messages
        });

        const aiResponse = response.choices[0].message.content;
        console.log(`[AI] Received response: "${aiResponse.substring(0, 50)}..."`);

        // 6. Update Memory & Learning
        const updatedHistory = [...(memory.chatHistory || []), 
            { role: 'user', content: message, timestamp: new Date() },
            { role: 'assistant', content: aiResponse, timestamp: new Date() }
        ];

        // Keep last 30 messages in history to save DB space
        memory.chatHistory = updatedHistory.slice(-30);

        // Learning heuristic: 
        if (message.toLowerCase().includes('i prefer') || message.toLowerCase().includes('i like') || message.toLowerCase().includes('preference')) {
             memory.preferences = (memory.preferences ? memory.preferences + ' | ' : '') + message;
        }

        // Save updated memory
        await memory.save();
        console.log(`[AI] Memory updated successfully.`);

        res.json({
            reply: aiResponse,
            memory: memory.preferences
        });

    } catch (error) {
        console.error('AI Error Details:', error);
        res.status(500).json({ 
            message: 'AI Assistant encountered an error', 
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

module.exports = {
    chatWithAI
};
