import React, { Fragment, useContext, useState } from 'react'
import { AiOutlineEdit, AiOutlineMail } from 'react-icons/ai';
import { BsTelephone } from 'react-icons/bs';
import { HiMinus, HiOutlineTrash, HiPlus } from 'react-icons/hi';
import Moment from 'react-moment';
import { deleteMember } from '../../../actions/membersActions';
import { AuthContext } from '../../../context/AuthContext';
import { DataContext } from '../../../context/DataContext';
import EditMemberForm from './EditMemberForm';

const Mmember = ({ membr }) => {

    const { token, user } = useContext(AuthContext);
    const { refreshRecord } = useContext(DataContext);

    const [editMember, setEditMember] = useState(false);
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null);

    const showEdit = () => {
        setEditMember(true)
    }

    const deleteMembr = () => {

        if(window.confirm(`Are you sure you want to delete ${membr.fullname} `)){

            deleteMember(token, membr.id, setSuccess, setError);
        }
    }

    const [nav, setNav] = useState(false);

    const handleNav = () => {
        setNav(!nav);
    }


    if(success !== null){
        alert(success);
        refreshRecord(Date.now());
        setSuccess(null)
    }

    if(error !== null){
        alert(error);
        setError(null);
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
                        <span className='text-slate-500 my-2.5'>{membr.fullname}</span>
                        <div className='flex justify-end'>
                            <Fragment>
                                {(user && user.role === 'admin') &&
                                    <span 
                                        className='px-2 pt-4 text-[#00df9a] cursor-pointer'
                                        onClick={showEdit}
                                    >
                                        <AiOutlineEdit size={15} />
                                    </span>
                                }
                                {(user && user.groupid === 0 && user.role === 'admin') &&
                                    <span 
                                        className='px-2 pt-4 text-[red] cursor-pointer'
                                        onClick={deleteMembr}
                                    >
                                        <HiOutlineTrash size={15} />
                                    </span>
                                }
                            </Fragment>
                        </div>
                    </div>
                </div>
                <div className={`grid grid-cols-10 my-1 px-2 ${nav ? 'block ease-in-out duration-500' : 'hidden'}`}>
                    <div className='col-span-1'></div>
                    <div className='col-span-9 text-xs space-y-2 text-gray-500 border-t border-gray-300 dark:border-gray-900 py-3'>
                        <div className='flex justify-start space-x-5'>
                            <span>
                                Category - {membr.category}
                            </span>
                            <span>
                                UID - {membr.uid}
                            </span>
                            <span>
                                Gender - {membr.gender}
                            </span>
                        </div>
                        <div className='flex justify-start space-x-5'>
                            <span className='flex'>
                                <BsTelephone className='mr-2 mt-0.5'/> {membr.mobile}
                            </span>
                            <span className='flex'>
                                <AiOutlineMail className='mr-2 mt-0.5'/> {membr.email}
                            </span>
                        </div>
                        <div className='flex justify-start space-x-5'>
                            <span>
                                Branch - {membr.branch}
                            </span>
                            <span>
                                Wing - {membr.wing}
                            </span>
                        </div>
                        <div className='flex justify-end'>
                            <Moment format='MMMM Do YYYY'>{membr.created_at}</Moment>
                        </div>
                    </div>
                </div>
            </div>

            {editMember && <EditMemberForm membr={membr} setEditMember={setEditMember} />}
        </Fragment>  
    )
}

export default Mmember
