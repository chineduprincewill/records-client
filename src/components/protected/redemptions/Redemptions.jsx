import React, { Fragment, useContext, useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import Moment from 'react-moment';
import { getDonationRedemptions, redeemDonation } from '../../../actions/redemptionsActions';
import { AuthContext } from '../../../context/AuthContext';
import { DataContext } from '../../../context/DataContext';
import Spinner from '../../../widgets/Spinner';

const Redemptions = ({ donation, setForm }) => {

    const { refreshRecord } = useContext(DataContext);

    const { token, logout, user } = useContext(AuthContext);
    const { record } = useContext(DataContext);
    const id = donation.id;

    const [redemptions, setRedemptions] = useState(null);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [isCreated, setIsCreated] = useState();

    const [amount, setAmount] = useState();
    const [channel, setChannel] = useState();
    const [receivedby, setReceivedby] = useState('');
    const [receivedon, setReceivedon] = useState();

    const [submitting, setSubmitting] = useState(false);

    const closeForm = () => {
        setForm(false);
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        if(window.confirm('Have you confirmed that your entries are correct because you cannot change them once you submit?')){

            const received_by = receivedby === '' ? 'self' : receivedby;

            const data = {
                donation_id : donation.id,
                amount,
                channel,
                received_by,
                received_on : receivedon
            }

            redeemDonation(token, data, setSuccess, setError, setSubmitting);
        }
    }

    if(success !== null){
        alert(success);
        setIsCreated(Date.now());
        refreshRecord(Date.now());
        setSuccess(null);
    }

    useEffect(() => {

        getDonationRedemptions(token, id, setRedemptions, setError);
    }, [token, id, isCreated, record])


    return (
        <div>
            <div className='fixed inset-0 bg-black bg-opacity-75 transition-opacity'></div>
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex mt-16 md:mt-0 md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className='w-full md:w-[600px] bg-gray-100 border border-gray-400 dark:text-gray-700 rounded-xl px-4 py-1'>
                        <div className='flex justify-end border-b border-gray-200 py-2 text-red-500'>
                            <span
                                className='cursor-pointer'
                                onClick={(e) => closeForm()}
                            >    
                                <AiOutlineCloseCircle />
                            </span>
                        </div>
                        <div className='px-1 border-b border-gray-200'>
                            <div className='text-lg my-2 flex justify-start text-slate-500'>{donation.event}, {donation.event_year}</div>
                            <div className='text-sm text-gray-700'>
                                <div className='grid grid-cols-5 py-1'>
                                    <span className='col-span-1 text-slate-500 text-left'>Member</span>
                                    <span className='col-span-4 text-left'>{donation.fullname}</span>
                                </div>
                                <div className='grid grid-cols-5 py-1'>
                                    <span className='col-span-1 text-slate-500 text-left'>Donated</span>
                                    <span className='col-span-4 text-left'>&#8358;{donation.donation}</span>
                                </div>
                                <div className='grid grid-cols-5 py-1'>
                                    <span className='col-span-1 text-slate-500 text-left'>Paid</span>
                                    <span className='col-span-4 text-left'>&#8358;{donation.redeemed}</span>
                                </div>
                            </div>
                            
                            {error !== null && <div className='text-left text-sm text-red-500 py-2'>{error}</div>}
                            
                        </div>
                        {(user && user.role) &&
                            <div className='my-1 px-1 border-b border-gray-200 py-4'>
                                <div className='text-md mb-1 flex justify-start text-slate-500'>Redeem pledge</div>
                                <form onSubmit={handleSubmit}>
                                    <div className='flex justify-between my-3'>
                                        <input 
                                            type="number" 
                                            className='w-[30%] bg-transparent p-1.5 rounded-md border border-slate-400 text-sm'
                                            placeholder='amount'
                                            onChange={(e) => setAmount(e.target.value)}
                                            required
                                        />
                                        <input 
                                            type="text" 
                                            className='w-[30%] bg-transparent p-1.5 rounded-md border border-slate-400 text-sm'
                                            placeholder='recorded by'
                                            onChange={(e) => setReceivedby(e.target.value)}
                                        />
                                        <select
                                            className='w-[30%] bg-transparent p-1.5 rounded-md border border-slate-400 text-sm'
                                            onChange={(e) => setChannel(e.target.value)}
                                            required
                                        >
                                            <option value="">channel</option>
                                            <option value="cash">cash</option>
                                            <option value="transfer">transfer</option>
                                            <option value="POS">POS</option>
                                        </select>
                                    </div>

                                    <div className='flex justify-start my-3 space-x-4 md:space-x-7'>
                                        <input 
                                            type="date" 
                                            className='w-[30%] bg-transparent px-1.5 rounded-md border border-slate-400 text-sm text-gray-700'
                                            onChange={(e) => setReceivedon(e.target.value)}
                                            required
                                        />
                                        <button
                                            className='w-[30%] flex justify-center bg-transparent border border-slate-500 text-slate-500 rounded-full p-1.5 hover:bg-slate-500 hover:text-white text-sm'
                                            disabled={submitting && 'disabled'}
                                        >
                                            {submitting ? 'Redeeming...' : 'Redeem'}
                                        </button>
                                    </div>

                                </form>
                                <div className='text-xs text-green-700 text-left my-1'>
                                    Note: Leaving the <strong>recorded by</strong> field empty implies you recorded the payment.
                                </div>
                            </div>
                        }

                        <div className='my-1 px-1 border-b border-gray-200 py-4'>
                            <div className='text-md flex justify-start text-slate-500'>Redemption history</div>
                            {
                                redemptions === null ? <Spinner w={135} /> : (
                                    redemptions === undefined ? logout() : (
                                        redemptions.length === 0 ? <div className='text-red-500 py-3 text-left text-sm'>No record of redemption found yet!</div> :
                                        <Fragment>
                                            <div className='w-full p-2 grid grid-cols-4 text-sm my-2 bg-gray-200'>
                                                <span className='col-span-1 text-left'>Amount</span>
                                                <span className='col-span-1 text-left'>Channel</span>
                                                <span className='col-span-1 text-left'>Date</span>
                                                <span className='col-span-1 text-left'>Recorder</span>
                                            </div>
                                            {
                                                redemptions.map((rdm => {
                                                    return (
                                                        <div className='w-full p-2 grid grid-cols-4 text-sm my-2 border border-gray-300 rounded-md'>
                                                            <span className='col-span-1 text-left'>&#8358;{rdm.amount}</span>
                                                            <span className='col-span-1 text-left'>{rdm.channel}</span>
                                                            <span className='col-span-1 text-left'><Moment format='MMMM Do YYYY'>{rdm.received_on}</Moment></span>
                                                            <span className='col-span-1 text-left'>{rdm.received_by}</span>
                                                        </div>
                                                    )
                                                }))
                                            }
                                        </Fragment>
                                    )
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Redemptions
