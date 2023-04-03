import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { updatePassword } from '../../actions/usersActions';
import { AuthContext } from '../../context/AuthContext';
import Spinner from '../../widgets/Spinner';

const PasswordUpdate = ({ setForm }) => {

    const { token, logout } = useContext(AuthContext);

    const [curr, setCurr] = useState('');
    const [newpass, setNewpass] = useState(null);
    const [confirm, setConfirm] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [confirmcheck, setConfirmcheck] = useState('');
    const [plengthcheck, setPlengthcheck] = useState('');
    const [uccheck, setUccheck] = useState('');
    const [numcheck, setNumcheck] = useState('');
    const [spcharcheck, setSpcharcheck] = useState('');

    const closeForm = () => {
        setForm(false);
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            curr, newpass, confirm
        }

        updatePassword(token, data, setSuccess, setError, setSubmitting);
    }

    if(success !== null){
        alert(success);
        closeForm();
        logout();
    }

    useEffect(() => {

        if(confirm !== null){
            confirm !== newpass && setConfirmcheck(<span className="text-red-500">Password mismatch!</span>); 
            confirm === newpass && setConfirmcheck(<span className="text-green-500">Password matched!</span>);
        }

        if(newpass !== null){
            newpass.length < 8 ? setPlengthcheck(<span className="text-red-500">Must be 8 characters and above!</span> ) : setPlengthcheck(<span className="text-green-500">Must be 8 characters and above!</span> ); 
            Boolean(newpass.match(/[A-Z]/)) ? setUccheck(<span className="text-green-500">Must contain an uppercase letter!</span>) : setUccheck(<span className="text-red-500">Must contain an uppercase letter!</span>);
            /\d/.test(newpass) ? setNumcheck(<span className="text-green-500">Must contain a number!</span>) : setNumcheck(<span className="text-red-500">Must contain a number!</span>);
            /[`!@#$%^&*?~]/.test(newpass) ? setSpcharcheck(<span className="text-green-500">Must contain any of `!@#$%^&*?~</span>) : setSpcharcheck(<span className="text-red-500">Must contain any of `!@#$%^&*?~</span>)
        }


    }, [newpass, confirm])


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
                            <div className='text-lg my-2 flex justify-start text-slate-500'>Password Update</div>
                            {error !== null && <span className='text-red-500 py-2'>{error}</span>}
                            <form onSubmit={handleSubmit}>
                                <input 
                                    input type="password"
                                    className="w-full bg-transparent my-3 p-2 border-b border-slate-500"
                                    placeholder='Current password'
                                    onChange={(e) => setCurr(e.target.value)}
                                    required
                                />
                                <input 
                                    input type="password"
                                    className="w-full bg-transparent mt-3 mb-2 p-2 border-b border-slate-500"
                                    placeholder='New password'
                                    onChange={(e) => setNewpass(e.target.value)}
                                    required
                                />
                                <small className='flex justify-end'><span>{plengthcheck}</span></small>
                                <small className='flex justify-end'><span>{uccheck}</span></small>
                                <small className='flex justify-end'><span>{numcheck}</span></small>
                                <small className='flex justify-end'><span>{spcharcheck}</span></small>
                                <input 
                                    input type="password"
                                    className="w-full bg-transparent mt-3 mb-2 p-2 border-b border-slate-500"
                                    placeholder='Confirm password'
                                    onChange={(e) => setConfirm(e.target.value)}
                                    required
                                />
                                <small className='flex justify-end'><span>{confirmcheck}</span></small>
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

export default PasswordUpdate
