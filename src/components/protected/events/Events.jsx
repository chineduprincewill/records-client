import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { useContext } from 'react'
import { BsPlusLg } from 'react-icons/bs'
import { AiOutlineWindows } from 'react-icons/ai'
import { getEvents } from '../../../actions/eventsActions'
import Pagetitle from '../../../widgets/Pagetitle'
import TableHeader from '../../../widgets/TableHeader'
import PrivateHeader from '../PrivateHeader'
import Sidebar from '../sidebar/Sidebar'
import { AuthContext } from '../../../context/AuthContext'
import EventsList from './EventsList'
import Spinner from '../../../widgets/Spinner'
import { DataContext } from '../../../context/DataContext'
import Search from '../../../widgets/Search'
import NumRows from '../../../widgets/NumRows'
import Pagination from '../../../widgets/Pagination'
import MeventsList from './MeventsList'
import NeweventForm from './NeweventForm'

const columns = [
    {
        name:'Name',
        field:'title',
        sortable:true
    }, 
    {
        name:'Date',
        field:'created_at',
        sortable:true
    }, 
    {
        name:'...',
        field:'',
        sortable:false
    }
]

const Events = () => {

    const { token, logout, user, role } = useContext(AuthContext);
    const { record } = useContext(DataContext);

    const [events, setEvents] = useState(null);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const [error, setError] = useState(null);
    let ITEMS_PER_PAGE = itemsPerPage;

    const [form, setForm] = useState(false);
    const [isCreated, setIsCreated] = useState();

    const showForm = () => {
        setForm(true);
    }

    const eventsData = useMemo(() => {

        if(events !== null && events !== undefined){

            let computedEvents = events;

            if(search) {
                computedEvents = computedEvents.filter(
                    evnt => evnt.title.toLowerCase().includes(search.toLowerCase())
                )
            }

            setTotalItems(computedEvents.length);

            //Sorting
            if( sorting.field ){
                const reversed = sorting.order === "asc" ? 1 : -1;
                computedEvents = computedEvents.sort(
                    (a, b) =>
                        reversed * a[sorting.field].localeCompare(b[sorting.field])
                );
            }

            if(itemsPerPage === '0'){
                return computedEvents;
            }
            else{
                return computedEvents.slice(
                    (currentPage - 1) * ITEMS_PER_PAGE,
                    (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
                );
            }
        }

    }, [events, currentPage, search, sorting, ITEMS_PER_PAGE, itemsPerPage])

    useEffect(() => {

        getEvents(token, setEvents, setError);
    }, [token, isCreated, record])

    return (
        <div>
            <PrivateHeader />
            <div className='w-full grid lg:grid-cols-8'>
                <Sidebar />
                <div className='w-full col-span-8 lg:col-span-7 px-4 lg:px-10'>
                    <Pagetitle icon={<AiOutlineWindows />} />
                    <div className='w-full px-2 lg:px-4 my-8'>
                        {/* Display an add button if user has enough privilege*/}
                        {(user && role === 'admin') &&
                            <div className='flex justify-end my-2'>
                                <button
                                    className='w-[120px] bg-transparent dark:bg-slate-500 dark:text-white p-2 border border-slate-500 text-slate-500 text-sm rounded-full flex justify-center space-x-1'
                                    onClick={showForm}
                                >
                                    <BsPlusLg size={12} className="mt-1" /><span>Event</span>
                                </button>
                            </div>
                        }
                    </div>

                    {/* SEARCH COMPONENT */}
                    {(events !== null && events !== undefined && events.length > 0) && 
                        <div className='w-full flex justify-end my-4'>
                            <Search onSearch={ (value) => {
                                setSearch(value);
                        }} />
                        </div>
                    }
                    
                    {/* NUM ROWS AND PAGINATION COMPONENTS */}
                    <div className='w-full flex justify-between mt-8 mb-4'>
                        {(events !== null && events !== undefined && events.length > 0) && 
                            <NumRows 
                                data={events} 
                                setItemsPerPage={setItemsPerPage}
                            />
                        }

                        <Pagination
                            total={totalItems}
                            itemsPerPage={ITEMS_PER_PAGE}
                            currentPage={currentPage}
                            onPageChange={page => setCurrentPage(page)}
                        />
                    </div>
                    
                    {/* ERROR MESSAGE IF ANY */}
                    {error && <p className='text-sm font-medium text-red-700'>{error}</p>}

                    
                    {events === null && error !== 'Token has expired' ? <Spinner w='250' /> : 
                        events === undefined || (error !== null && error === 'Token has expired') ? 
                            logout() :
                            <Fragment>
                                {/* LARGE SCREEN */}
                                <div className='w-full overflow-auto hidden md:block'> 
                                    <table className='w-full'>
                                        <TableHeader 
                                            columns={columns} 
                                            onSorting={(field, order) => 
                                                setSorting({ field, order })
                                            } 
                                        />
                                        <EventsList events={eventsData} />
                                    </table>       
                                </div>
                                {/* SMALL SCREEN */}
                                <div className='w-full py-3 md:hidden'>
                                    <MeventsList events={eventsData} />
                                </div>
                            </Fragment>
                                   
                    }
                </div>
            </div>  

            {form && <NeweventForm setForm={setForm} setIsCreated={setIsCreated} />}
        </div>
    )
}

export default Events
