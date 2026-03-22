const { Mistral } = require('@mistralai/mistralai');
const AiMemory = require('../models/AiMemory');
const { Service, User, Appointment } = require('../config/pg_models');

const apiKey = process.env.MISTRAL_API_KEY;
const client = new Mistral({ apiKey });

/**
 * @desc    Chat with AI for booking or help
 * @route   POST /api/ai/chat
 * @access  Private
 */
const chatWithAI = async (req, res) => {
    const { message } = req.body;
    const userId = req.user.id; // UUID from PostgreSQL

    if (!message) {
        return res.status(400).json({ message: 'Message is required' });
    }

    try {
        // 1. Get/Create AI Memory for user (Using Mongoose for flexible JSON storage)
        // Note: we use the PG UUID as the user field in Mongoose
        let memory = await AiMemory.findOne({ user: userId });
        if (!memory) {
            memory = await AiMemory.create({ user: userId, chatHistory: [] });
        }

        // 2. Fetch relevant context from PostgreSQL
        const services = await Service.findAll({ where: { status: 'active' }, limit: 10 });
        const pros = await User.findAll({ where: { role: 'pro', status: 'active' }, limit: 10 });

        const context = `
            Available Services: ${JSON.stringify(services.map(s => ({ name: s.name, category: s.category, price: s.price, duration: s.duration })))}
            Available Professionals: ${JSON.stringify(pros.map(p => ({ name: p.name, specialization: p.specialization, phone: p.phone })))}
            User Previous Note: ${memory.preferences || 'None'}
            Today's Date: ${new Date().toLocaleDateString()}
        `;

        // 3. Prepare messages for Mistral
        const systemPrompt = `
            You are FixitMeet AI, a smart assistant for a service booking platform.
            Your goal is to help users find services, choose professionals, and book appointments.
            
            Be concise, professional, and friendly. 
            If the user wants to book, guide them to choose from the available services and professionals listed below.
            
            Context about the system:
            ${context}
            
            Rules:
            - If you detect the user wants to book, suggest the best service/pro matching their needs.
            - "Memory": Remember what user says. If they mention specific preferences, acknowledge them.
            - Always respond in text. If they ask about prices, use the info in context.
            - If they are ready to book, tell them: "I've noted your preference for [Service] with [Professional] on [Date] at [Time]. Please confirm if I should proceed."
        `;

        const messages = [
            { role: 'system', content: systemPrompt },
            ...memory.chatHistory.slice(-10).map(msg => ({ role: msg.role, content: msg.content })),
            { role: 'user', content: message }
        ];

        // 4. Call Mistral
        const response = await client.chat.complete({
            model: 'mistral-large-latest',
            messages: messages
        });

        const aiResponse = response.choices[0].message.content;

        // 5. Save chat history to memory
        memory.chatHistory.push({ role: 'user', content: message });
        memory.chatHistory.push({ role: 'assistant', content: aiResponse });
        
        // 6. Basic learning: If user mentions preferences, update preferences field
        if (message.toLowerCase().includes('i prefer') || message.toLowerCase().includes('my preference') || message.toLowerCase().includes('i like')) {
            memory.preferences = (memory.preferences ? memory.preferences + ' | ' : '') + message;
        }

        await memory.save();

        res.json({
            reply: aiResponse,
            memory: memory.preferences
        });

    } catch (error) {
        console.error('AI Error:', error);
        res.status(500).json({ message: 'AI Assistant encountered an error', error: error.message });
    }
};

module.exports = {
    chatWithAI
};
