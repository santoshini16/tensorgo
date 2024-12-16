import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaExclamationCircle, FaRegFile, FaCommentDots, FaEdit } from 'react-icons/fa'; 
import { toast } from 'react-hot-toast'; 
import Modal from './Modal';

const RequestTable = ({ selectedCategory }) => {
  const [requests, setRequests] = useState([]);
  const [comments, setComments] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRequest, setEditingRequest] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      try {
        let url = 'http://localhost:3000/posts';
        if (selectedCategory) {
          url = `http://localhost:3000/posts?category=${selectedCategory.name}`;
        }

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const formattedRequests = Array.isArray(data.result) ? data.result : [data.result];
        setRequests(formattedRequests);

        const extractedComments = data.result
          .map((req) => req.additionalComments)
          .filter((comment) => comment);
        setComments(extractedComments);
      } catch (error) {
        console.error('Failed to fetch requests:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [selectedCategory]);

  const handleEdit = (request) => {
    setEditingRequest(request);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingRequest(null);
  };

  const handleModalSubmit = async (updatedRequest) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/${editingRequest._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedRequest),
      });

      if (!response.ok) {
        throw new Error(`Failed to update request with ID ${editingRequest._id}. Status: ${response.status}`);
      }

      const updatedData = await response.json();
      console.log(updatedData)
      setRequests((prevRequests) =>
        prevRequests.map((req) => (req._id === editingRequest._id ? updatedData.result : req))
      );
      toast.success(`Request with ID ${editingRequest._id} updated successfully.`);
      handleModalClose();
    } catch (error) {
      console.error(`Failed to update request with ID ${editingRequest._id}:`, error.message);
      toast.error(`Failed to update request with ID ${editingRequest._id}.`);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete request with ID ${id}. Status: ${response.status}`);
      }

      setRequests(requests.filter((req) => req._id !== id));
      toast.success(`Request with ID ${id} deleted successfully.`); 
    } catch (error) {
      console.error(`Failed to delete request with ID ${id}:`, error.message);
      toast.error(`Failed to delete request with ID ${id}.`); 
    }
  };

  if (loading) {
    return <p>Loading requests...</p>;
  }

  const noDataFound = requests.length === 0 && comments.length === 0;

  return (
    <div className='flex flex-col justify-center items-center mt-8'>
      <h2 className="text-2xl font-bold text-white">Customer Request Information</h2>
      <div className="flex gap-24 justify-center">
        {noDataFound ? (
          <motion.div
            className="flex justify-center items-center flex-col text-white mt-16"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FaExclamationCircle className="text-4xl mb-4" />
            <p className="text-lg">No data found</p>
          </motion.div>
        ) : (
          <div className="mt-8 flex gap-24">
            <div>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <FaRegFile className="mr-2" />
                All Requests
              </h2>
              <table className="min-w-full text-white">
                <thead>
                  <tr className="text-black bg-gradient-to-r from-white/40 to-blue-50 backdrop-blur-lg shadow-lg border-b border-gray-200">
                    <th className="border px-4 py-2">Category</th>
                    <th className="border px-4 py-2">Request</th>
                    <th className="border px-4 py-2">Created Time</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req) => (
                    <tr key={req._id}>
                      <td className="border px-4 py-2">{req.category}</td>
                      <td className="border px-4 py-2">{req.request}</td>
                      <td className="border px-4 py-2">{new Date(req.createdAt).toLocaleString()}</td>
                      <td className="border px-4 py-2">
                        <button
                          className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 mr-1"
                          onClick={() => handleEdit(req)}
                        >
                          
                          Edit
                        </button>
                        <button
                          className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
                          onClick={() => handleDelete(req._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <FaCommentDots className="mr-2" />
                Additional Comments
              </h2>
              <div className="space-y-4">
                {comments.map((comment, index) => (
                  <motion.div
                    key={index}
                    className="p-2 text-black bg-gradient-to-r from-white/40 to-blue-50 backdrop-blur-lg shadow-lg rounded-lg flex items-center"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    {comment}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <Modal
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
        />
      )}
    </div>
  );
};

export default RequestTable;









