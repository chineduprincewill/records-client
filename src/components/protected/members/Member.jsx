import React, { Fragment, useContext, useState } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { HiOutlineTrash } from 'react-icons/hi'
import Moment from 'react-moment'
import { deleteMember } from '../../../actions/membersActions'
import { AuthContext } from '../../../context/AuthContext'
import { DataContext } from '../../../context/DataContext'
import EditMemberForm from './EditMemberForm'

const Member = ({ membr }) => {

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
                <td className='py-3 px-3 whitespace-nowrap'>{membr.category}</td>
                <td className='py-3 px-3 whitespace-nowrap'>{membr.uid}</td>
                <td className='py-3 px-3 whitespace-nowrap'>{membr.fullname}</td>
                <td className='py-3 px-3 whitespace-nowrap'>{membr.mobile}</td>
                <td className='py-3 px-3 whitespace-nowrap'>{membr.email}</td>
                <td className='py-3 px-3 whitespace-nowrap'>{membr.gender}</td>
                <td className='py-3 px-3 whitespace-nowrap'>{membr.branch}</td>
                <td className='py-3 px-3 whitespace-nowrap'>{membr.wing}</td>
                <td className='py-3 px-3 whitespace-nowrap'><Moment format='MMMM Do YYYY'>{membr.created_at}</Moment></td>
                <td className='py-3 px-3 whitespace-nowrap flex'>
                    <Fragment>
                        {(user && user.role === 'admin') &&
                            <span 
                                className='px-2 pt-2 text-[#00df9a] cursor-pointer'
                                onClick={showEdit}
                            >
                                <AiOutlineEdit size={15} />
                            </span>
                        }
                        {(user && user.groupid === "0" && user.role === 'admin') &&
                            <span 
                                className='px-2 pt-2 text-[red] cursor-pointer'
                                onClick={deleteMembr}
                            >
                                <HiOutlineTrash size={15} />
                            </span>
                        }
                    </Fragment>
                </td>
            </tr>

            {editMember && <EditMemberForm membr={membr} setEditMember={setEditMember} />}
        </Fragment>
    )
}

export default Member
