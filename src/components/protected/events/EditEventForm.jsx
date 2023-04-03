import React, { useContext, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { updateEvent } from '../../../actions/eventsActions';
import { AuthContext } from '../../../context/AuthContext'
import { DataContext } from '../../../context/DataContext';
import Spinner from '../../../widgets/Spinner';

const EditEventForm = ({ evnt, setEditEvent }) => {

    const { token } = useContext(AuthContext);
    const { refreshRecord } = useContext(DataContext);

    const id = evnt.id;
    const [title, setTitle] = useState(evnt.title);

    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const closeForm = () => {
        setEditEvent(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            id, title
        }

        updateEvent(token, data, setSuccess, setError, setSubmitting);
    }

    if(success !== null){
        refreshRecord(Date.now());
        alert(success);
        closeForm();
    }


    return (
        <div>
            <div className='fixed inset-0 bg-black bg-opacity-75 transition-opacity'></div>
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex mt-16 md:mt-0 md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className='w-full md:w-[500px] bg-gray-100 border border-gray-400 dark:text-gray-700 rounded-xl px-4 py-1'>
                        <div className='flex justify-end border-b border-gray-200 py-2 text-red-500'>
                            <span
                                className='cursor-pointer'
                                onClick={(e) => closeForm()}
                            >    
                                <AiOutlineCloseCircle />
                            </span>
                        </div>
                        <div className='px-6'>
                            <div className='text-lg my-2 flex justify-start text-slate-500'>Update Event</div>
                            {error !== null && <span className='text-red-500 py-2'>{error}</span>}
                            <form onSubmit={handleSubmit}>
                                <input 
                                    input type="text"
                                    className="w-full bg-transparent my-3 p-2 border-b border-slate-500"
                                    placeholder='Title'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                                {submitting ? <Spinner w={135} /> :
                                    <button
                                        className='w-full bg-transparent my-8 p-2 border border-slate-500 rounded-full'
                                        type='submit'
                                    >
                                        Update
                                    </button>
                                }
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditEventForm
