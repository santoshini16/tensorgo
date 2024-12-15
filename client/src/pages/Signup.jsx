import React from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import {useGoogleLogin} from '@react-oauth/google';
import { googleAuth,register } from '../api/api';

const Signup = () => {
    const navigate = useNavigate()
    const responseGoogle = async (authResult) => {
		try {
			if (authResult["code"]) {
				const result = await googleAuth(authResult.code);
				const {email, name, password} = result.data.user;
				const token = result.data.token;
				const obj = {email,name, token, password};
				localStorage.setItem('user-info',JSON.stringify(obj));
        localStorage.setItem('token',token);
				navigate('/home')
			} else {
				console.log(authResult);
				throw new Error(authResult);
			}
		} catch (e) {
			console.log('Error while Google Login...', e);
		}
	};
 const googleLogin=useGoogleLogin({
    onSuccess: responseGoogle,
	onError: responseGoogle,
    flow:'auth-code'
 })
   
 const handleSubmit = async (e) => {
    e.preventDefault(); 
  
    try {
      const { username: name, email, password } = e.target.elements;
  

      const userData = {
        name: name.value,
        email: email.value,
        password: password.value,
      };
  
   
      const result = await register(userData);

   
      const { email: userEmail, name: userName, token } = result;

   
      const userInfo = { email: userEmail, name: userName, token };
      localStorage.setItem('user-info', JSON.stringify(userInfo));
      navigate('/login')
     
      alert('Registration successful!');
    } catch (error) {
      console.error('Error during registration:', error.response?.data || error.message);
      alert('Registration failed. Please try again.');
    }
  };
  

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-7 loginContainer">
      <form className="flex flex-col items-center gap-3" onSubmit={handleSubmit} >
        <div className="flex flex-col">
          <label className="text-sm font-medium text-white">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter a Username"
            className="border border-white/50 shadow-md bg-black text-white rounded-xl w-[313px] h-[41px] mt-2 pl-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-white">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border border-white/50 shadow-md bg-black text-white rounded-xl w-[313px] h-[41px] mt-2 pl-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-white">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border border-white/50 shadow-md bg-black text-white rounded-xl w-[313px] h-[41px] mt-2 pl-2"
          />
        </div>

        <button
          type="submit"
          className="rounded-xl w-[313px] h-[41px] bg-[#1A5FFF] text-white shadow-md mt-3 mb-2"
        >
          Sign Up
        </button>
        
      </form>
      <div className='flex justify-center items-center'>
            <div className='w-32 h-1 bg-white rounded-md m-1'></div>
            <p className='text-white'>OR</p>
            <div className='w-32 h-1 bg-white m-1 rounded-md'></div>
        </div>
        <div className="flex flex-col justify-center items-center gap-2 text-sm font-normal">
          <p className="text-white">Already have an account?</p>
          <button className="rounded-xl w-[313px] h-[41px] bg-[#1A5FFF] text-white shadow-md mt-3 mb-5" onClick={googleLogin}>
            SIGN IN WITH Google
          </button>
        </div>
    </div>
  );
};

export default Signup;