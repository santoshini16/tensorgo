const Request = require('../models/requestModel');
const intercom = require('../utils/intercom');


const createRequest = async (req, res) => {
  const { category, additionalComments, request } = req.body;
   console.log('log...',req.user)
  try {
  
    const dbrequest = await Request.create({
      userId: req.user._id,
      category,
      additionalComments,
      request,
    });

    const intercomMessage = {
      message_type: 'inapp',
      body: `New request in category ${category}: ${request}`,
      from: { type: 'user', email: req.user.email },
    };
    await intercom.createMessage(intercomMessage);

    res.status(201).json({
      message: 'Request created successfully',
      dbrequest,
      alert: 'Your request has been successfully created and notified to the customer service team.',
    });
  } catch (error) {
    console.error('Error creating request:', error.message);
    res.status(500).json({
      message: 'Failed to create request',
      error: error.message,
    });
  }
};



module.exports = {
  createRequest,
};


