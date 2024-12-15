import React from 'react'
import { FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="p-4 flex items-center justify-between rounded-bl-3xl rounded-br-3xl bg-gradient-to-r from-white/40 to-blue-50 backdrop-blur-lg shadow-lg border-b border-gray-200">
        <p> Made with <span> <FaHeart style={{ color: 'red', fontSize: '2rem' }} /></span> by Santoshini.. </p>
    </div>
  )
}

export default Footer