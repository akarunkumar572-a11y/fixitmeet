const axios = require('axios');

(async () => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'jane@example.com',
            password: 'password'
        });
        console.log(response.data);
    } catch (e) {
        console.error(e.response ? e.response.data : e.message);
    }
})();
