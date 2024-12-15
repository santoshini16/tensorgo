import React from 'react';
import { FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="p-4 bg-gradient-to-r from-white/40 to-blue-50 backdrop-blur-lg shadow-lg border-t border-gray-200">
      <div className="flex justify-center items-center text-center">
        <span>Made with</span> <FaHeart style={{ color: 'red', fontSize: '1.5rem', margin: '0 5px' }} />by Santoshini
      </div>
    </div>
  );
};

export default Footer;
