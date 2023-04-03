import React, { Fragment, useContext, useState } from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { CiSettings } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'
import PasswordUpdate from '../components/protected/PasswordUpdate'
import { AuthContext } from '../context/AuthContext'

const HeaderDropdown = () => {

    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    const [form, setForm] = useState(false);

    const userLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <Fragment>
            <div className='bg-transparent h-[120px] fixed inset-0 z-10 mt-16 flex justify-end'>
                <div className='w-[200px] h-[120px] bg-slate-500 px-3 border-x border-b border-slate-400 rounded-b-md text-white text-sm'>
                    <div>
                        <span 
                            className='flex justify-start space-x-2 py-3 border-b border-slate-400 cursor-pointer hover:text-slate-300'
                            onClick={setForm}
                        >
                            <CiSettings size={25} />
                            <span className='mt-1'>Password update</span>
                        </span>
                        <span 
                            className='flex justify-start space-x-2 py-3 cursor-pointer hover:text-slate-300'
                            onClick={userLogout}
                        >
                            <AiOutlineLogout 
                                size={25}  
                                className="text-red-300"
                            />
                            <span className='mt-1'>Logout</span>
                        </span>
                    </div>
                    
                </div>
            </div>

            {form && <PasswordUpdate setForm={setForm} />}
        </Fragment>   
    )
}

export default HeaderDropdown
