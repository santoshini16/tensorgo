const Request = require('../models/requestModel');


const deleteRequest = async (req, res) => {
  const { requestId } = req.params; 

  try {

    const request = await Request.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    await Request.findByIdAndDelete(requestId);

    res.status(200).json({ message: 'Request deleted successfully' });
  } catch (error) {
    console.error('Error deleting request:', error);
    res.status(500).json({ message: 'Failed to delete request', error: error.message });
  }
};

module.exports = {
  deleteRequest,
};



