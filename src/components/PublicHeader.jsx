import React from 'react'
import { Link } from 'react-router-dom'
import Switcher from '../Switcher'

const PublicHeader = () => {
    return (
        <div className="w-full flex justify-end px-5 pt-5 pb-1 space-x-8">
            <Link to="/" className='my-1' >Home</Link>
            <Link to="/login" className='my-1' >Sign In</Link>
            <Switcher />
        </div>
    )
}

export default PublicHeader
