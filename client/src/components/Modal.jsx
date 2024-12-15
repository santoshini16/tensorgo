import React, { useState } from 'react';

const Modal = ({ onClose, onSubmit }) => {
  const [category, setCategory] = useState('');
  const [request, setRequest] = useState('');
  const [additionalComments, setAdditionalComments] = useState('');

  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleRequestChange = (e) => setRequest(e.target.value);
  const handleCommentsChange = (e) => setAdditionalComments(e.target.value);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit({ category, request, additionalComments });
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gradient-to-r from-white/40 to-blue-50 backdrop-blur-lg border-b border-gray-200 rounded-lg shadow-lg w-1/3 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Create Customer Service Request</h2>
        <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Request</label>
            <textarea
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your request"
              rows="4"
              value={request}
              onChange={handleRequestChange}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={category}
              onChange={handleCategoryChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select category</option>
              <option value="General Queries">General Queries</option>
              <option value="Product Features Queries">Product Features Queries</option>
              <option value="Product Pricing Queries">Product Pricing Queries</option>
              <option value="Product Feature Implementation Requests">Product Feature Implementation Requests</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Comments</label>
            <textarea
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter additional comments"
              rows="4"
              value={additionalComments}
              onChange={handleCommentsChange}
            ></textarea>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;

