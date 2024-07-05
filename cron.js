const cron = require('node-cron');
const axios = require('axios');

// Schedule a task to run at midnight every day
cron.schedule('20 11 * * *', async () => {
    try {
        console.log('Running cron job...');
        const response = await axios.get('http://localhost:3000/api/users/transferdata');
        console.log('Cron job response:', response.data);
    } catch (error) {
        console.error('Error running cron job:', error);
    }
});
