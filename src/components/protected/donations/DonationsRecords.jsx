import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { totalPaid, totalPledge } from '../../../actions/donationsActions';
import NumRows from '../../../widgets/NumRows';
import Pagination from '../../../widgets/Pagination';
import Search from '../../../widgets/Search';
import TableHeader from '../../../widgets/TableHeader';
import DonationsList from './DonationsList';

const columns = [
    {
        name:'Name',
        field: 'fullname',
        sortable: true
    }, 
    {
        name:'Mobile',
        field:'mobile',
        sortable:true
    },
    {
        name:'Event',
        field:'event',
        sortable:true
    }, 
    {
        name:'Pledge',
        field:'donation',
        sortable:false
    },
    {
        name:'Paid',
        field:'redeemed',
        sortable:false
    },
    {
        name:'Recorded by',
        field:'recorder',
        sortable:false
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

const DonationsRecords = ({ donations }) => {

    //const { donationsCount, totalPledge, totalPaid } = useContext(DataContext);

    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });
    let ITEMS_PER_PAGE = itemsPerPage;

    const [totalpledge, setTotalpledge] = useState(0);
    const [totalpaid, setTotalpaid] = useState(0);

    const donationsData = useMemo(() => {

        if(donations !== null && donations !== undefined){

            let computedDonations = donations;

            if(search) {
                computedDonations = computedDonations.filter(
                    donatn => donatn.member_group.toLowerCase().includes(search.toLowerCase()) ||
                            donatn.uid.includes(search) ||
                            donatn.fullname.toLowerCase().includes(search.toLowerCase()) ||
                            donatn.gender.toLowerCase().includes(search.toLowerCase()) ||
                            donatn.event.toLowerCase().includes(search.toLowerCase()) ||
                            donatn.recorder.toLowerCase().includes(search.toLowerCase()) ||
                            donatn.mobile.includes(search)
                )
            }

            setTotalItems(computedDonations.length);

            //Sorting
            if( sorting.field ){
                const reversed = sorting.order === "asc" ? 1 : -1;
                computedDonations = computedDonations.sort(
                    (a, b) =>
                        reversed * a[sorting.field].localeCompare(b[sorting.field])
                );
            }

            if(itemsPerPage === '0'){
                return computedDonations;
            }
            else{
                return computedDonations.slice(
                    (currentPage - 1) * ITEMS_PER_PAGE,
                    (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
                );
            }
        }

    }, [donations, currentPage, search, sorting, ITEMS_PER_PAGE, itemsPerPage])

    useEffect(() => {

        setTotalpledge(totalPledge(donationsData));
        setTotalpaid(totalPaid(donationsData));

    }, [donationsData])

    return (
        <Fragment>
            {/* SEARCH COMPONENT */}
            {(donations !== null && donations !== undefined && donations.length > 0) && 
                <div className='w-full grid md:flex justify-between my-4'>
                    <div className='flex justify-start bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-2 space-x-5 md:space-x-12 text-sm text-gray-500 dark:text-gray-400 mb-3 md:mb-0'>
                        <div>Count : <span className='font-medium text-slate-500'>{donationsData.length}</span></div>
                        <div>Pledge : <span className='font-medium text-red-500'>&#8358; {totalpledge}</span></div>
                        <div>Paid : <span className='font-medium text-green-500'>&#8358; {totalpaid}</span></div>
                    </div>
                    <Search onSearch={ (value) => {
                        setSearch(value);
                    }} />
                </div>
            }
            
            {/* NUM ROWS AND PAGINATION COMPONENTS */}
            <div className='w-full flex justify-between mt-6 mb-4'>
                {(donations !== null && donations !== undefined && donations.length > 0) && 
                    <NumRows 
                        data={donations} 
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

            {/* LARGE SCREEN */}
            <div className='w-full overflow-auto hidden lg:block'> 
                <table className='w-full'>
                    <TableHeader 
                        columns={columns} 
                        onSorting={(field, order) => 
                            setSorting({ field, order })
                        } 
                    />
                    {<DonationsList dntns={donationsData} view="web" />}
                </table>       
            </div>

            {/* SMALL SCREEN */}
            <div className='w-full py-3 lg:hidden'>
                <DonationsList dntns={donationsData} view="mobile" />
            </div>

            {/* PAGINATION COMPONENTS */}
            <div className='w-full flex justify-end mt-6'>
                <Pagination 
                    total={totalItems}
                    itemsPerPage={ITEMS_PER_PAGE}
                    currentPage={currentPage}
                    onPageChange={page => setCurrentPage(page)}
                />
            </div>

        </Fragment>
    )
}

export default DonationsRecords
