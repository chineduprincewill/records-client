import React from 'react'
import { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Pagetitle = ({ icon }) => {

    const location = useLocation();

    const { user } = useContext(AuthContext);

    const pagetitle = location.pathname.replace('/', '')[0].toUpperCase() + location.pathname.replace('/', '').replace('-', ' ').slice(1)

    return (
        <div className='px-2 flex justify-between lg:px-4 border-b border-gray-200 dark:border-gray-800 py-3'>
            <div className='flex text-xl space-x-2'><div className='mt-1'>{icon}</div> <span>{pagetitle}</span></div>
            <span className='text-sm mt-1'>Welcome, {user && user.role}</span>
        </div>
    )
}

export default Pagetitle
