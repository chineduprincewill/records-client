import React, { Fragment, useContext, useState } from 'react'
import { AiOutlineEdit } from 'react-icons/ai';
import { HiMinus, HiOutlineTrash, HiPlus } from 'react-icons/hi';
import Moment from 'react-moment';
import { deleteEvent } from '../../../actions/eventsActions';
import { AuthContext } from '../../../context/AuthContext';
import { DataContext } from '../../../context/DataContext';
import EditEventForm from './EditEventForm';

const Mevent = ({ evnt }) => {

    const { token, user } = useContext(AuthContext);
    const { refreshRecord } = useContext(DataContext);

    const [editEvent, setEditEvent] = useState(false);
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null);

    const [nav, setNav] = useState(false);

    const handleNav = () => {
        setNav(!nav);
    }

    const showEdit = () => {
        setEditEvent(true)
    }

    const deleteEvnt = () => {

        if(window.confirm(`Are you sure you want to delete ${evnt.title} `)){

            deleteEvent(token, evnt.id, setSuccess, setError);
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
                        <span className='text-slate-500 my-2.5'>{evnt.title}</span>
                        <div className='flex justify-end'>
                        {(user && user.groupid === 0 && user.role === 'admin') &&
                            <Fragment>
                                <span 
                                    className='px-2 pt-4 text-[#00df9a] cursor-pointer'
                                    onClick={showEdit}
                                >
                                    <AiOutlineEdit size={15} />
                                </span>
                                <span 
                                    className='px-2 pt-4 text-[red] cursor-pointer'
                                    onClick={deleteEvnt}
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
                        <div className='flex  justify-start'>
                            created on &nbsp;<Moment format='MMMM Do YYYY'>{evnt.created_at}</Moment>
                        </div>
                    </div>
                </div>
            </div>

            {editEvent && <EditEventForm evnt={evnt} setEditEvent={setEditEvent} />}
        </Fragment>    
    )
}

export default Mevent
