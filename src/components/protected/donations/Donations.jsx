import React, { useContext, useEffect, useState } from 'react'
import { SlRefresh } from 'react-icons/sl'
import { BsPlusLg } from 'react-icons/bs'
import { FaDonate } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { allDonations, filterDonations } from '../../../actions/donationsActions'
import { AuthContext } from '../../../context/AuthContext'
import { DataContext } from '../../../context/DataContext'
import FilterEvents from '../../../widgets/FilterEvents'
import FilterYears from '../../../widgets/FilterYears'
import Pagetitle from '../../../widgets/Pagetitle'
import PrivateHeader from '../PrivateHeader'
import Sidebar from '../sidebar/Sidebar'
import DonationsRecords from './DonationsRecords'
import Spinner from '../../../widgets/Spinner'

const Donations = () => {

    const { token, logout, user } = useContext(AuthContext);
    const { record } = useContext(DataContext);

    const [donations, setDonations] = useState(null);
    const [event, setEvent] = useState('');
    const [year, setYear] = useState('');
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(false);
    const [filtering, setFiltering] = useState(false);
    const [clear, setClear] = useState(false);

    const filterDonation = () => {

        const data = {
            event, year
        }

        if(event === '' && year === ''){
            alert('Nothing was selected to filter!');
        }
        else{
            filterDonations(token, data, setDonations, setError, setFiltering);
        }

    }

    useEffect(() => {
        if(clear){
            setDonations(null);
        }

        allDonations(token, setDonations, setError, setFetching);
    }, [token, clear, record])

    return (
        <div>
            <div>
                <PrivateHeader />
                <div className='w-full grid lg:grid-cols-8'>
                    <Sidebar />
                    <div className='w-full col-span-8 lg:col-span-7 px-4 lg:px-10'>
                        <Pagetitle icon={<FaDonate />} />
                        <div className='my-0'>
                            <div className='flex justify-start space-x-2 md:space-x-0 md:justify-between border-b border-gray-200 dark:border-gray-900 py-4'>

                                <div className='grid md:flex justify-start md:space-x-24'>
                                    {/* FILTER SECTION */}
                                    <div className='flex justify-between space-x-4'>
                                        
                                        <div className='mr-[270px] mb-12 md:mb-0'>
                                            <FilterEvents setEvent={setEvent} clear={clear} />
                                        </div>
                                        <div className='mb-12 md:mb-0'>    
                                            <FilterYears setYear={setYear} clear={clear} />
                                        </div>
                                    </div>
                                    
                                    <div className='flex justify-start space-x-8 my-6 md:my-0'>
                                        <div>
                                            <button
                                                className='w-[100px] bg-transparent py-2 dark:bg-slate-500 dark:text-white border border-slate-500 text-slate-500 rounded-full text-sm hover:bg-slate-500 hover:text-gray-200 dark:hover:bg-transparent dark:hover:text-slate-500'
                                                onClick={filterDonation}
                                            >
                                                {filtering ? 'filtering...' : 'Filter'}
                                            </button>
                                        </div>
                                        <div>
                                            <button
                                                className='bg-transparent py-2 px-4 dark:bg-green-500 dark:text-white border border-green-500 text-green-500 rounded-full text-sm hover:bg-green-500 hover:text-white hover:dark:bg-transparent hover:dark:text-green-500'
                                                onClick={setClear}
                                            >
                                                <SlRefresh size={19} />
                                            </button>
                                        </div>
                                    </div>
                                </div>                                

                                {/* ADD DONATION SECTION */}
                                <div className='flex pt-2 md:pt-0'>
                                    {(user && user.role === 'admin') &&
                                        <Link
                                            className='h-[38px] px-6 mt-16 md:mt-0 bg-transparent dark:bg-slate-500 dark:text-white p-2 border border-slate-500 text-slate-500 text-sm rounded-full flex justify-center space-x-1 hover:bg-slate-500 hover:text-white hover:dark:bg-transparent hover:dark:text-slate-500'
                                            to='/new-donation'
                                        >
                                            Donate
                                        </Link>
                                    } 
                                </div>
                            </div>
                        </div>
                        <div className='my-4'>
                                {error !== null && <span className='my-2 text-red-500'>{error}</span>}
                                {
                                    fetching ? <Spinner w={180} /> :
                                        donations !== null && (
                                            donations === undefined ? logout() : (
                                                donations.length === 0 ? <span className='my-2 text-red-500'>No records found!</span> : 
                                                    <DonationsRecords donations={donations} />
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

export default Donations
