const axios = require('axios');


const intercomApi = axios.create({
  baseURL: 'https://api.intercom.io',
  headers: {
    'Authorization': `Bearer ${process.env.INTERCOM_ACCESS_TOKEN}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

const createMessage = async (messageDetails) => {
  try {
    const response = await intercomApi.post('/messages', messageDetails);
    return response.data;
  } catch (error) {
    throw new Error('Failed to send message to Intercom: ' + error.message);
  }
};

module.exports = {
  createMessage,
};


