import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from '../components/Header';
import RequestTable from '../components/RequestTable';
import Footer from '../components/Footer';

const categories = [
  { id: 1, name: 'General Queries', description: 'Get answers to general questions about our service.' },
  { id: 2, name: 'Product Features Queries', description: 'Learn more about the features of our product.' },
  { id: 3, name: 'Product Pricing Queries', description: 'Inquire about our pricing plans and offers.' },
  { id: 4, name: 'Product Feature Implementation Requests', description: 'Request specific feature implementations.' },
];

const Dashboard = () => {
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredCategories(categories); 
    } else {
      const filtered = categories.filter((category) =>
        category.name.toLowerCase().includes(query.toLowerCase()) || 
        category.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <div>
      <Toaster />
        <Header onSearch={handleSearch} />
        <div className="p-8 flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold text-white mb-6">Categories</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className="bg-gradient-to-r from-white/40 to-blue-50 backdrop-blur-lg shadow-lg border-b border-gray-200 rounded-lg p-4 border hover:shadow-lg transition duration-300 flex flex-col justify-center items-center"
              >
                <h2 className="text-lg font-semibold text-gray-900">{category.name}</h2>
                <p className="text-sm text-gray-800 mt-2">{category.description}</p>
                <button
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={() => handleSelectCategory(category)}
                >
                  Select
                </button>
              </div>
            ))}
          </div>
          <RequestTable selectedCategory={selectedCategory} />
        </div>
        <Footer/>
      </div>
    </>
  );
};

export default Dashboard;



