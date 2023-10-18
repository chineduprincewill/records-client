import React, { Fragment, useContext, useState } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { HiOutlineTrash } from 'react-icons/hi'
import Moment from 'react-moment'
import { deleteBranch } from '../../../actions/branchesActions'
import { AuthContext } from '../../../context/AuthContext'
import { DataContext } from '../../../context/DataContext'
import EditBranchForm from './EditBranchForm'

const Branch = ({ brnch }) => {

    const { token, user } = useContext(AuthContext);
    const { refreshRecord } = useContext(DataContext);

    const [editBranch, setEditBranch] = useState(false);
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null);

    const showEdit = () => {
        setEditBranch(true)
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
            <tr className="px-1 text-sm even:bg-gray-100 odd:bg-white dark:odd:bg-transparent dark:even:bg-[#131313]">
                <td className='py-3 px-3 whitespace-nowrap'>{brnch.category}</td>
                <td className='py-3 px-3 whitespace-nowrap'>{brnch.title}</td>
                <td className='py-3 px-3 whitespace-nowrap'>{brnch.mobile}</td>
                <td className='py-3 px-3 whitespace-nowrap'>{brnch.email}</td>
                <td className='py-3 px-3 whitespace-nowrap'><Moment format='MMMM Do YYYY'>{brnch.created_at}</Moment></td>
                <td className='py-3 px-3 whitespace-nowrap flex'>
                    {(user && user.groupid === 0 && user.role === 'admin') &&
                        <Fragment>
                            <span 
                                className='px-2 pt-2 text-[#00df9a] cursor-pointer'
                                onClick={showEdit}
                            >
                                <AiOutlineEdit size={15} />
                            </span>
                            <span 
                                className='px-2 pt-2 text-[red] cursor-pointer'
                                onClick={deleteBrnch}
                            >
                                <HiOutlineTrash size={15} />
                            </span>
                        </Fragment>
                    }
                </td>
            </tr>

            {editBranch && <EditBranchForm brnch={brnch} setEditBranch={setEditBranch} />}
        </Fragment>
        
    )
}

export default Branch
