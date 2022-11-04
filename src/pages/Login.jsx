import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import inventoryImage from "./inventory2.png"
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const { user, logIn } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await logIn(email, password)
      navigate('/')
    } catch (error) {
      console.log(error);
      setError(error.message)
    }
  };

  return (
    <div className='flex w-full h-screen'>
      <img
        className=' m-6'
        src={inventoryImage}
        alt='/'
      />
      <div className=' w-full px-4 py-24 z-50'>
        <div className='max-w-[450px] h-[600px] mx-auto '>
          <div className='max-w-[320px] mx-auto py-16'>
            <h1 className='text-3xl font-bold'>Sign In</h1>
            {error ? <p className='p-3 bg-indigo-700 my-2'>{error}</p> : null}
            <form onSubmit={handleSubmit} className='w-full flex flex-col py-4'>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className='p-3 my-2 border border-gray-200 rounded-md'
                type='email'
                placeholder='Email'
                autoComplete='email'
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                className='p-3 my-2  border border-gray-200 rounded-md'
                type='password'
                placeholder='Password'
                autoComplete='current-password'
              />
              <button className='bg-indigo-700 py-3 my-6 rounded font-bold text-white'>
                Sign In
              </button>
              <div className='flex justify-between items-center text-sm '>
                <p>
                  <input className='mr-2' type='checkbox' />
                  Remember me
                </p>
                <p>Need Help?</p>
              </div>
              <p className='py-8 '>
                <Link to='/signup'>Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Login;
