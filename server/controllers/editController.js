const Request = require('../models/requestModel');
const intercom = require('../utils/intercom');

const deleteRequest = async (req, res) => {
  const { requestId } = req.params;

  try {
    const request = await Request.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    await Request.findByIdAndDelete(requestId);

    const conversationId = request.intercomConversationId; 
    console.log('conversationid',conversationId)
    if (conversationId) {
      await intercom.closeConversation(conversationId);
    }

    res.status(200).json({
      message: 'Request and associated Intercom conversation deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting request:', error);
    res.status(500).json({
      message: 'Failed to delete request',
      error: error.message,
    });
  }
};

const updateRequest = async (req, res) => {
  const { editId } = req.params;
  const { category, additionalComments, request } = req.body;
  console.log(req.body)

  try {
 
    const existingRequest = await Request.findById(editId);
    console.log('existing..',existingRequest)

    if (!existingRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }

 
    existingRequest.category = category || existingRequest.category;
    existingRequest.additionalComments = additionalComments || existingRequest.additionalComments;
    existingRequest.request = request || existingRequest.request;
    await existingRequest.save();

   
    const conversationId = existingRequest.intercomConversationId; // Ensure this ID exists
    if (conversationId) {
      const updatedMessage = `Updated request in category ${category}: ${request}`;
      await intercom.updateConversation(conversationId, updatedMessage);
    }

    res.status(200).json({
      message: 'Request and Intercom conversation updated successfully',
      result: existingRequest,
    });
  } catch (error) {
    console.error('Error updating request:', error.message);
    res.status(500).json({
      message: 'Failed to update request',
      error: error.message,
    });
  }
};

module.exports = {
  deleteRequest,
  updateRequest
};




