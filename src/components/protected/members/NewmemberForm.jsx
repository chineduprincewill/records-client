import React, { Fragment, useContext, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { createMember } from '../../../actions/membersActions';
import { AuthContext } from '../../../context/AuthContext';
import BranchesList from '../../../widgets/BranchesList';
import Spinner from '../../../widgets/Spinner';

export const NewmemberForm = ({ setForm, setIsCreated }) => {

    const { token, user } = useContext(AuthContext);

    const [category, setCategory] = useState('');
    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname] = useState('');
    const [othernames, setOthernames] = useState('');
    const [gender, setGender] = useState('');
    const [branchid, setBranchid] = useState();
    const [wing, setWing] = useState('');
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
            category, lastname, firstname, othernames, gender, branchid, wing, mobile, email
        }

        createMember(token, data, setSuccess, setError, setSubmitting);
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
                    <div className='w-full md:w-[900px] bg-gray-100 border border-gray-400 dark:text-gray-700 rounded-xl px-4 py-1'>
                        <div className='flex justify-end border-b border-gray-200 py-2 text-red-500'>
                            <span
                                className='cursor-pointer'
                                onClick={(e) => closeForm()}
                            >    
                                <AiOutlineCloseCircle />
                            </span>
                        </div>
                        <div className='px-6'>
                            <div className='text-lg my-2 flex justify-start text-slate-500'>New Member</div>
                            {error !== null && <span className='text-red-500 py-2'>{error}</span>}
                            <form onSubmit={handleSubmit}>
                                <div className='flex justify-between'>
                                    <select
                                        className="w-full bg-transparent m-3 p-2 border-b border-slate-500"
                                        onChange={(e) => setCategory(e.target.value)}
                                        required
                                    >
                                        <option value="">select category</option>
                                        <option value="Individual">Individual</option>
                                        <option value="Group">Group</option>
                                    </select>
                                    
                                </div>
                                <div className='flex justify-between'>
                                    <input 
                                        input type="text"
                                        className="w-full bg-transparent m-3 p-2 border-b border-slate-500"
                                        placeholder={category === 'Group' ? 'Branch/Group name' : 'Last name'}
                                        onChange={(e) => setLastname(e.target.value)}
                                        required
                                    />
                                    <input 
                                        input type="text"
                                        className={`w-full bg-transparent m-3 p-2 border-b border-slate-500 ${category === 'Group' && 'hidden'}`}
                                        placeholder='First name'
                                        onChange={(e) => setFirstname(e.target.value)}
                                    />
                                    
                                </div>
                                <div className='flex justify-between'>
                                    <input 
                                        input type="text"
                                        className={`w-full bg-transparent m-3 p-2 border-b border-slate-500 ${category === 'Group' && 'hidden'}`}
                                        placeholder='Other names'
                                        onChange={(e) => setOthernames(e.target.value)}
                                    />
                                    <input 
                                        input type="text"
                                        className="w-full bg-transparent m-3 p-2 border-b border-slate-500"
                                        placeholder='Mobile'
                                        onChange={(e) => setMobile(e.target.value)}
                                        required
                                    />
                                    
                                </div>
                                <div className='flex justify-between'>
                                    <input 
                                        input type="text"
                                        className="w-full bg-transparent m-3 p-2 border-b border-slate-500"
                                        placeholder='Email'
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <select
                                        className="w-full bg-transparent m-3 p-2 border-b border-slate-500"
                                        onChange={(e) => setGender(e.target.value)}
                                        required
                                    >
                                        <option value="">select gender</option>
                                        {category === 'Individual' ? 
                                            <Fragment>
                                                <option value="male">male</option>
                                                <option value="female">female</option>
                                            </Fragment> :
                                            <option value="group">group</option>   
                                        }
                                    </select>
                                    
                                </div>
                                <div className='flex justify-between'>
                                    <select
                                        className="w-full bg-transparent m-3 p-2 border-b border-slate-500"
                                        onChange={(e) => setBranchid(e.target.value)}
                                        required
                                    >
                                        <option value={user && user.groupid}>{user && user.groupname}</option>
                                        <BranchesList />
                                    </select>
                                    <select
                                        className="w-full bg-transparent m-3 p-2 border-b border-slate-500"
                                        onChange={(e) => setWing(e.target.value)}
                                        required
                                    >
                                        <option value="">select wing</option>
                                        {category === 'Individual' ? 
                                            <Fragment>
                                                <option value="Fathers">Fathers</option>
                                                <option value="Mothers">Mothers</option>
                                                <option value="Youths">Youths</option>
                                                <option value="Children">Children</option>
                                            </Fragment> :
                                            <option value="Group">Group</option>
                                        }
                                    </select>
                                </div>
                                <div className='flex justify-end'>
                                    <div className='w-[50%]'>
                                        {submitting ? <Spinner w={135} /> :
                                            <button
                                                className='w-full bg-transparent my-8 p-2 border border-slate-500 rounded-full'
                                                type='submit'
                                            >
                                                Create
                                            </button>
                                        }
                                    </div>
                                    
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewmemberForm
