import React, { useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext';
import { HiMenu, HiOutlineLogout, HiOutlineUser, HiX } from 'react-icons/hi';
import { generateLinks } from '../../../actions/navFunction';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {

    const navigate = useNavigate();

    const { logout, role, user } = useContext(AuthContext);
    const [nav, setNav] = useState(false);

    const navLinks = generateLinks(user, role);

    const toggleNav = () => {
        setNav(!nav);
    }

    const userLogout = () => {
        logout();
        navigate('/login');
    }

    
  return (
    <nav className='lg:col-span-1 bg-slate-900 lg:min-h-[90vh] w-[1px] items-start justify-between'>
        {nav ? 
        <HiX size={25} 
            className="text-gray-200 mb-0 mx-6 z-50 mt-0.5 fixed top-3.5 lg:left-6 lg:hidden cursor-pointer"
            onClick={toggleNav} /> :
        <HiMenu 
            size={25} 
            className="text-gray-200 mb-0 mx-6 z-50 mt-0.5 fixed top-3.5 lg:left-6 lg:hidden cursor-pointer"
            onClick={toggleNav}
        /> }  
        <div className={nav ? 'fixed inset-0 mt-16 bg-black bg-opacity-50 transition-opacity' : ''}></div>
        <div className={`overflow-auto bg-slate-900 space-y-8 z-20 fixed lg:mt-0 h-screen pt-6 lg:pt-0 lg:block ${nav ? 'block' : 'hidden'}`}>
            <div className='lg:pt-5'>
                <div className='flex justify-center'>
                    <div className='bg-white rounded-full text-slate-600 p-1'>
                        <HiOutlineUser size={25} />    
                    </div> 
                </div>
                <div className='text-center'>
                    <span className='text-xs text-green-500'>{user && user.username}</span>
                </div>
            </div>
            
            {navLinks}
            <div className='w-full border-t border-gray-700' />
            <span 
                className='w-full flex items-center justify-start space-x-8 px-6 cursor-pointer hover:border-gray-400 border-1-4 border-transparent group'
                onClick={() => userLogout()}
            >
                <span className='text-red-500 group-hover:text-white'>
                    <HiOutlineLogout className="nav-icon" />
                </span>
                <h1 
                    className='text-red-500 group-hover:text-white'
                >
                    LogOut
                </h1>
            </span>
        </div>
    </nav>
  )
}


export default Sidebar