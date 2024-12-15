const Request = require('../models/requestModel');

const fetchRequests = async (req, res) => {
    try {
        console.log("Fetching requests...");
        
        const { category } = req.query; 
        
        let query = {};
        if (category) {
            query = { category };
        }

        const response = await Request.find(query);

        res.status(200).json({
            message: "success",
            result: response
        });
    } catch (error) {
        console.error('Error fetching requests:', error.message);
        res.status(500).json({
            message: "Failed to fetch requests",
            error: error.message
        });
    }
};

module.exports = { fetchRequests };

