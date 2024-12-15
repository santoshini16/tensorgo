import React, { useState} from 'react';
import { login } from '../api/api';
import { Link ,useNavigate} from 'react-router-dom'; 

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate()
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
    
      const result = await login(formData);
      const { token, user } = result;
      const userInfo = { email: user.email, name: user.name, token };
      localStorage.setItem('user-info', JSON.stringify(userInfo));
      alert('Login successful!');
      navigate('/home')
    } catch (error) {
      console.error('Error during login:', error.response?.data || error.message);
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-7 loginContainer">
      <form className="flex flex-col items-center gap-3" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-white">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="border border-white/50 shadow-md bg-black text-white rounded-xl w-[313px] h-[41px] mt-2 pl-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-white">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="border border-white/50 shadow-md bg-black text-white rounded-xl w-[313px] h-[41px] mt-2 pl-2"
          />
        </div>

        <button
          type="submit"
          className="rounded-xl w-[313px] h-[41px] bg-[#1A5FFF] text-white shadow-md mt-3 mb-2"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;

