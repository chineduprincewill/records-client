import React, { useContext, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { createUser } from '../../../actions/usersActions';
import { AuthContext } from '../../../context/AuthContext';
import GroupsList from '../../../widgets/GroupsList';
import Spinner from '../../../widgets/Spinner';

const NewuserForm = ({ setForm, setIsCreated }) => {

    const { token } = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');

    const [groupid, setGroupid] = useState('');
    const [mobile, setMobile] = useState('')
    const [email, setEmail] = useState('');

    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const closeForm = () => {
        setForm(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            username, role, groupid, mobile, email
        }

        createUser(token, data, setSuccess, setError, setSubmitting);
    }

    if(success !== null){
        setIsCreated(Date.now());
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
                            <div className='text-lg my-2 flex justify-start text-slate-500'>New User</div>
                            {error !== null && <span className='text-red-500 py-2'>{error}</span>}
                            <form onSubmit={handleSubmit}>
                                <input 
                                    input type="text"
                                    className="w-full bg-transparent my-3 p-2 border-b border-slate-500"
                                    placeholder='Username'
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                                <select
                                    className="w-full bg-transparent my-3 p-2 border-b border-slate-500"
                                    onChange={(e) => setRole(e.target.value)}
                                    required
                                >
                                    <option value="">select role</option>
                                    <option value="admin">admin</option>
                                    <option value="auditor">auditor</option>
                                </select>
                                
                                <input 
                                    input type="text"
                                    className="w-full bg-transparent my-3 p-2 border-b border-slate-500"
                                    placeholder='Mobile'
                                    onChange={(e) => setMobile(e.target.value)}
                                    required
                                />
                                <input 
                                    input type="text"
                                    className="w-full bg-transparent my-3 p-2 border-b border-slate-500"
                                    placeholder='Email'
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <select
                                    className="w-full bg-transparent my-3 p-2 border-b border-slate-500"
                                    onChange={(e) => setGroupid(e.target.value)}
                                    required
                                >
                                    <option value="">select group</option>
                                    <GroupsList />
                                </select>

                                {submitting ? <Spinner w={135} /> :
                                    <button
                                        className='w-full bg-transparent my-8 p-2 border border-slate-500 rounded-full'
                                        type='submit'
                                    >
                                        Create
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

export default NewuserForm
