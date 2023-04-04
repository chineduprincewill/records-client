import React, { Fragment, useContext, useState } from 'react'
import { AiOutlineEdit, AiOutlineMail } from 'react-icons/ai';
import { HiMinus, HiOutlineTrash, HiPlus } from 'react-icons/hi';
import { BsTelephone } from 'react-icons/bs';
import Moment from 'react-moment';
import { AuthContext } from '../../../context/AuthContext'
import EditBranchForm from './EditBranchForm';
import { DataContext } from '../../../context/DataContext';
import { deleteBranch } from '../../../actions/branchesActions'; 

const MBranch = ({ brnch }) => {

    const { token, user } = useContext(AuthContext);
    const { refreshRecord } = useContext(DataContext);

    const [editBranch, setEditBranch] = useState(false);
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null);

    const showEdit = () => {
        setEditBranch(true)
    }

    const [nav, setNav] = useState(false);

    const handleNav = () => {
        setNav(!nav);
    }


    const deleteBrnch = () => {

        if(window.confirm(`Are you sure you want to delete ${brnch.title} `)){

            deleteBranch(token, brnch.id, setSuccess, setError);
        }
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
                        <span className='text-slate-500 my-2.5'>{brnch.title}</span>
                        <div className='flex justify-end'>
                        {(user && user.groupid === "0" && user.role === 'admin') &&
                            <Fragment>
                                <span 
                                    className='px-2 pt-4 text-[#00df9a] cursor-pointer'
                                    onClick={showEdit}
                                >
                                    <AiOutlineEdit size={15} />
                                </span>
                                <span 
                                    className='px-2 pt-4 text-[red] cursor-pointer'
                                    onClick={deleteBrnch}
                                >
                                    <HiOutlineTrash size={15} />
                                </span>
                            </Fragment>
                        }
                        </div>
                    </div>
                </div>
                <div className={`grid grid-cols-10 my-1 px-2 ${nav ? 'block ease-in-out duration-500' : 'hidden'}`}>
                    <div className='col-span-1'></div>
                    <div className='col-span-9 text-xs space-y-2 text-gray-500 border-t border-gray-300 dark:border-gray-900 py-3'>
                        <div>{brnch.category}</div>
                        <div className='flex justify-start space-x-5'>
                            <span className='flex'>
                                <BsTelephone className='mr-2 mt-0.5'/> {brnch.mobile}
                            </span>
                            <span className='flex'>
                                <AiOutlineMail className='mr-2 mt-0.5'/> {brnch.email}
                            </span>
                        </div>
                        <div className='flex  justify-start'>
                            <Moment format='MMMM Do YYYY'>{brnch.created_at}</Moment>
                        </div>
                    </div>
                </div>
            </div>

            {editBranch && <EditBranchForm brnch={brnch} setEditBranch={setEditBranch} />}
        </Fragment>        
    )
}

export default MBranch

