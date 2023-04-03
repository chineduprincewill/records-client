import React, { Fragment, useState } from 'react'
import { AiOutlineMail, AiOutlineOrderedList, AiOutlineUser } from 'react-icons/ai'
import { BsTelephone } from 'react-icons/bs'
import { HiMinus, HiPlus } from 'react-icons/hi'
import Moment from 'react-moment'
import Redemptions from '../redemptions/Redemptions'

const Mdonation = ({ dntn }) => {

    const [nav, setNav] = useState(false);
    const [form, setForm] = useState(false);

    const showForm = () => {
        setForm(true);
    }

    const handleNav = () => {
        setNav(!nav);
    }

    return (
        <Fragment>
            <div className="border border-gray-300 dark:border-gray-800 rounded-md my-3">
                <div className='grid grid-cols-10 px-2 bg-transparent text-gray-500'>
                    <div 
                        className='col-span-1 cursor-pointer'
                        onClick={handleNav}
                    >
                        {nav ? 
                            <HiMinus 
                                size={20}
                                className="my-3"
                            />
                            :
                            <HiPlus 
                                size={20} 
                                className="my-3" 
                            />
                        }
                        
                    </div>
                    <div className='col-span-9 flex justify-between'>
                        <span className='text-slate-500 my-2.5'>{dntn.fullname}</span>
                        <span className='text-slate-500 my-2.5'>&#8358; {dntn.donation}</span>
                        <div className='flex justify-end'>
                            <Fragment>
                                <span 
                                    className='text-[#00df9a] cursor-pointer mt-4 hover:text-green-700'
                                    onClick={showForm}
                                >
                                    <AiOutlineOrderedList size={15} />
                                </span>
                            </Fragment>
                        </div>
                    </div>
                </div>
                <div className={`grid grid-cols-10 my-1 px-2 ${nav ? 'block ease-in-out duration-500' : 'hidden'}`}>
                    <div className='col-span-1'></div>
                    <div className='col-span-9 text-xs space-y-2 text-gray-500 border-t border-gray-300 dark:border-gray-900 py-3'>
                        <div className='flex justify-start space-x-5'>
                            <span>
                                Event - {dntn.event}, {dntn.event_year}
                            </span>
                            <span>
                                Paid - {dntn.redeemed}
                            </span>
                        </div>
                        <div className='flex justify-between md:justify-start md:space-x-5'>
                            <span className='flex'>
                                <BsTelephone className='mr-2 mt-0.5'/> {dntn.mobile}
                            </span>
                            <span className='flex'>
                                <AiOutlineMail className='mr-2 mt-0.5'/> {dntn.email}
                            </span>
                            <span className='flex'>
                                <AiOutlineUser className='mr-2 mt-0.5'/> {dntn.gender}
                            </span>
                        </div>
                        <div className='flex justify-start space-x-5'>
                            <span>
                                UID - {dntn.uid}
                            </span>
                            <span>
                                Branch - {dntn.member_group}
                            </span>
                        </div>
                        <div className='flex justify-end'>
                            <Moment format='MMMM Do YYYY'>{dntn.created_at}</Moment>
                        </div>
                    </div>
                </div>
            </div>

            {form && <Redemptions donation={dntn} setForm={setForm } />}
        </Fragment>
    )
}

export default Mdonation
