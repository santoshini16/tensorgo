const mongoose = require('mongoose');


const requestSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  additionalComments: { type: String, required: true },
  category: { type: String, required: true },
  request: { type: String, required: true },
  intercomConversationId: { type: String }, 
  createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Request', requestSchema);
