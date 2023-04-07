import React, { Fragment, useContext, useEffect, useState } from 'react'
import { AiOutlineCloseCircle, AiOutlinePlus, AiOutlineSend } from 'react-icons/ai';
import { FaDonate } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import FilterEvents from '../../../widgets/FilterEvents';
import FilterMembers from '../../../widgets/FilterMembers';
import FilterYears from '../../../widgets/FilterYears';
import Pagetitle from '../../../widgets/Pagetitle';
import PrivateHeader from '../PrivateHeader';
import Sidebar from '../sidebar/Sidebar';
import NeweventForm from '../events/NeweventForm'
import NewmemberForm from '../members/NewmemberForm'
import { BsToggleOff, BsToggleOn } from 'react-icons/bs';
import { createDonation } from '../../../actions/donationsActions';
import { AuthContext } from '../../../context/AuthContext';
import NextSearch from './NextSearch';

export const NewDonation = () => {

    const navigate = useNavigate();

    const { token } = useContext(AuthContext);

    const [member, setMember] = useState('');
    const [event, setEvent] = useState('');
    const [year, setYear] = useState('');
    const [donation, setDonation] = useState('');
    const [completepay, setCompletepay] = useState('');
    const [recorder, setRecorder] = useState('self');
    const [memberName, setMemberName] = useState();

    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const [submitting, setSubmitting] = useState(false);
    const [search, setSearch] = useState('event');

    const [newevent, setNewevent] = useState(false);
    const [newmember, setNewmember] = useState(false);

    const [isCreated, setIsCreated] = useState(null);
    const [irecorded, setIrecorded] = useState(true);


    let stage;

    const updatIrecorded = () => {
        setIrecorded(!irecorded);
    }

    if(search !== null){

        search === 'event' && (stage = <div className='flex'>
                <FilterEvents setEvent={setEvent} /> 
                <NextSearch setSearch={setSearch} val={'year'} btnText={'Next'} />
                <AiOutlinePlus size={20} className="mt-2 text-green-500 cursor-pointer" onClick={setNewevent} title="create new event" />
            </div>);
        search === 'year' && (stage = <div className='flex'>
                <FilterYears setYear={setYear} />
                <NextSearch setSearch={setSearch} val={'member'} btnText={'Next'} />
            </div>);
        search === 'member' && (stage = <div className='flex'>
                <FilterMembers setMember={setMember} setMemberName={setMemberName} />
                <NextSearch setSearch={setSearch} val={'event'} btnText={'Restart'} />
                <AiOutlinePlus size={20} className="mt-2 text-green-500 cursor-pointer" onClick={setNewmember} title="create new member" />
            </div>);
    }

    const handleSubmit = () => {
        if(donation === '' || completepay === '' || recorder === ''){
            alert('All form fields must be filled!');
        }
        else{
            const data = {
                member,
                event,
                year,
                donation,
                completepay,
                recorder
            }

            if(window.confirm('Are you sure you have confirmed your entries? You will not be able to edit once you have submitted.')){

                createDonation(token, data, setSuccess, setError, setSubmitting);
            }
        }
    }

    if(success !== null){
        alert(success);
        setSuccess(null);
        navigate('/donations')
    }

    useEffect(() => {

        isCreated !== null && window.location.reload();
        irecorded ? setRecorder('self') : setRecorder('');
    }, [isCreated, irecorded])


    return (
        <div>
            <PrivateHeader />
            <div className='w-full grid lg:grid-cols-8'>
                <Sidebar />
                <div className='w-full col-span-8 lg:col-span-7 px-4 lg:px-10'>
                    <Pagetitle icon={<FaDonate />} />
                    <div className='w-full my-4'>
                        <div className='flex justify-end border-b border-gray-200 dark:border-gray-800 pb-4'>
                            <Link
                                to='/donations'
                                className='w-[120px] bg-transparent dark:bg-slate-500 dark:text-white p-2 border border-slate-500 text-slate-500 text-sm rounded-full flex justify-center space-x-1 hover:bg-slate-500 hover:text-white hover:dark:bg-transparent hover:dark:text-slate-500'
                            >
                                <span>Donations</span>
                            </Link>
                        </div>
                    </div>

                    <div className='py-0.5'>
                        <p className='text-sm rounded-md bg-gray-100 text-slate-500 dark:bg-gray-900 dark:text-gray-500 border border-gray-200 dark:border-gray-800 px-2 py-1 mb-5'>If you cannot find what you are searching for in the dropdown that appears when you type, please click on the green plus icon to add what you are searching for</p>
                        {stage}     
                    </div>

                    {error && <span className='py-3 text-red-500'>{error}</span>}

                    <div className='w-full grid grid-cols-1 md:grid-cols-2 my-12 py-4 border-t border-gray-200 dark:border-gray-900 '>
                        <div className='col-span-1 space-y-8 mt-3 md:border-r border-gray-300 dark:border-gray-900'>
                            {event !== '' && 
                                <div className='grid grid-cols-5'>
                                    <div className='col-span-1 text-slate-500'>
                                        Event
                                    </div>
                                    <div className='col-span-3'>    
                                        {event}
                                    </div>
                                    <div className='col-span-1 flex justify-center'>    
                                        <AiOutlineCloseCircle 
                                            size={15} 
                                            className="text-red-500 mt-1.5 cursor-pointer" 
                                            onClick={(e) => setEvent('')}
                                        />
                                    </div>
                                </div>
                            }
                            {year !== '' && 
                                <div className='grid grid-cols-5'>
                                    <div className='col-span-1 text-slate-500'>
                                        Year
                                    </div>
                                    <div className='col-span-3'>    
                                        {year}
                                    </div>
                                    <div className='col-span-1 flex justify-center'>    
                                        <AiOutlineCloseCircle 
                                            size={15} 
                                            className="text-red-500 mt-1.5 cursor-pointer" 
                                            onClick={(e) => setYear('')}
                                        />
                                    </div>
                                </div>
                            }
                            {member !== '' &&
                                <div className='grid grid-cols-5'>
                                    <div className='col-span-1 text-slate-500'>
                                        Member
                                    </div>
                                    <div className='col-span-3'>    
                                        {memberName}
                                    </div>
                                    <div className='col-span-1 flex justify-center'>    
                                        <AiOutlineCloseCircle 
                                            size={15} 
                                            className="text-red-500 mt-1.5 cursor-pointer" 
                                            onClick={(e) => setMember('')}
                                        />
                                    </div>
                                </div>
                            }
                        </div>
                        <div className='col-span-1 space-y-4 mt-6 md:mt-0 md:px-6'>
                            {(event !== '' && year !== '' && member !== '') && 
                                <Fragment>
                                    <div>
                                        <input
                                            type="number"
                                            className="w-full md:w-[300px] bg-transparent p-2 border-b border-gray-400 dark:border-slate-600 dark:text-gray-500"
                                            placeholder="Enter donation"
                                            onChange={(e) => setDonation(e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <select
                                            className="w-full md:w-[300px] bg-transparent p-2 border-b border-gray-400 dark:border-slate-600 dark:text-gray-500"
                                            onChange={(e) => setCompletepay(e.target.value)}
                                            required
                                        >
                                            <option value="">Payment completed?</option>
                                            <option value="yes">yes</option>
                                            <option value="no">no</option>
                                        </select>
                                    </div>
                                    
                                    <div className='flex justify-start space-x-8 p-2'>
                                        <span>Are you the recorder? <span className='text-sm text-gray-500 ml-2'>{irecorded ? 'Yes' : 'No'}</span></span>
                                        <span 
                                            className='cursor-pointer'
                                            onClick={updatIrecorded}
                                        >  
                                            {
                                                irecorded ? <BsToggleOn size={20} className="text-green-500 mt-1" /> : <BsToggleOff size={20} className="text-gray-500 mt-1" />                                          
                                            }

                                        </span>
                                    </div>
                                    {
                                        !irecorded &&  
                                            <div>
                                                <input
                                                    type="text"
                                                    className="w-full md:w-[300px] bg-transparent p-2 border-b border-gray-400 dark:border-slate-600 dark:text-gray-500"
                                                    placeholder="Enter recorder"
                                                    onChange={(e) => setRecorder(e.target.value)}
                                                />
                                            </div>
                                    }

                                    <div>
                                        <div 
                                            className='w-full md:w-[300px] mt-8 flex justify-between p-2 bg-transparent dark:bg-slate-500 text-slate-500 dark:text-white border border-slate-500 rounded-full cursor-pointer hover:bg-slate-500 hover:text-white hover:dark:bg-transparent hover:dark:text-slate-500'
                                            onClick={!submitting ? handleSubmit : undefined}
                                        >
                                            <span></span>
                                            <span>{submitting ? 'Submitting...' : 'Submit'}</span>
                                            <AiOutlineSend size={20} />
                                        </div>
                                    </div>
                                    
                                </Fragment>
                            }
                        </div>
                    </div>
                </div>
            </div>

            {newevent && <NeweventForm setForm={setNewevent} setIsCreated={setIsCreated} />}
            {newmember && <NewmemberForm setForm={setNewmember} setIsCreated={setIsCreated} />}
        </div>
    )
}

export default NewDonation
