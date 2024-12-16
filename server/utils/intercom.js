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

const closeConversation = async (conversationId) => {
  try {
    const response = await intercomApi.post(`/conversations/${conversationId}/parts`, {
      message_type: 'close',
      admin_id: process.env.INTERCOM_ADMIN_ID, 
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to close Intercom conversation: ' + error.message);
  }
};

const updateConversation = async (conversationId, updatedMessage) => {
  try {
    const response = await intercomApi.post(`/conversations/${conversationId}/parts`, {
      message_type: 'note', 
      admin_id: process.env.INTERCOM_ADMIN_ID,
      body: updatedMessage,
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to update Intercom conversation: ' + error.message);
  }
};

module.exports = {
  createMessage,
  closeConversation,
  updateConversation
};



