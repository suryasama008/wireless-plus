import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { Data } from '../context/DataContext';
import logo from "./logo.ico"
const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const { users } = Data()
  const userName = users.filter((item) => item.id === user?.uid)[0]?.firstName;

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex items-center justify-between p-4 bg-blue-700 w-full '>
      <h1 className='text-2xl text-white font-bold'>Wireless +</h1>
      {user?.email && (
        <div className='flex items-center space-x-6 text-md text-white'>
          <div className=''>
            <Link to='/'>
              <h1>Home</h1>
            </Link>
          </div>
          <div>
            <Link to='/addproduct'>
              <h1>Add Product</h1>
            </Link>
          </div>
        </div>
      )}
      {user?.email && (
        <div className='flex text-md  text-white space-x-2'>
          <p className='capitalize	'>{userName}, </p>
          <button onClick={handleLogout} className=''>
            Logout
          </button>
        </div>
      )}
    </div>
  )
};

export default Navbar;
