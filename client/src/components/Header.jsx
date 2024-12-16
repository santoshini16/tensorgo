import React, { useState } from 'react';
import { BellIcon } from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { toast } from 'react-hot-toast'; 

const Header = ({ onSearch, notifications }) => {

  const [search, setSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem('user-info')) || {};
  const userEmail = userInfo?.email || 'guest@example.com';
  const token = userInfo?.token;
  console.log(token)

  const getInitials = (email) => {
    const namePart = email.split('@')[0];
    const parts = namePart.split(/[\.\-_]/);
    return parts.map((part) => part.charAt(0).toUpperCase()).join('');
  };

  const initials = getInitials(userEmail);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearch(query);
    onSearch(query); 
  };

  const handleLogout = () => {
    localStorage.removeItem('user-info');
    localStorage.removeItem('token');
    navigate('/signup');
    toast.success('Logged out successfully'); // Toast message for logout
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmitRequest = async (formData) => {
    console.log(formData);
    try {
      const response = await fetch('http://localhost:3000/requests/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success(data.alert);  
        setIsModalOpen(false); 
      } else {
        toast.error('Failed to create request: ' + data.message); 
      }
      
    } catch (error) {
      console.error('Error creating request:', error);
      toast.error('An error occurred while creating the request.');  
    }
  };
  
  return (
    <>
      <header className="p-4 flex items-center justify-between rounded-bl-3xl rounded-br-3xl bg-gradient-to-r from-white/40 to-blue-50 backdrop-blur-lg shadow-lg border-b border-gray-200">
        <div className="text-2xl font-bold text-blue-600">Customer Service App</div>
        <div className="flex items-center bg-white shadow-sm border rounded-lg overflow-hidden w-1/3">
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={handleSearch}
            className="flex-grow px-4 py-2 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none"
          />
          <button 
            onClick={() => onSearch(search)}
            className="px-4 py-2 bg-blue-500 text-white font-medium hover:bg-blue-600 transition">
            Search
          </button>
        </div>

        <div className="flex items-center space-x-6">
          <button
            onClick={handleOpenModal}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Create Request
          </button>

          <div className="relative">
            <BellIcon className="h-6 w-6 text-gray-400 hover:text-blue-600 transition cursor-pointer" />
            {notifications > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {notifications}
              </span>
            )}
          </div>

          <div className="relative">
            <div
              className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center rounded-full font-semibold shadow-md cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {initials}
            </div>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-60 mr-4 bg-white rounded-lg shadow-md text-gray-700">
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="text-sm">{userEmail}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {isModalOpen && (
        <Modal onClose={handleCloseModal} onSubmit={handleSubmitRequest} />
      )}
    </>
  );
};

export default Header;





