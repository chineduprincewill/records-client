import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { useContext } from 'react'
import { BsPlusLg } from 'react-icons/bs'
import { HiOutlineOfficeBuilding } from 'react-icons/hi'
import { getBranches } from '../../../actions/branchesActions'
import { AuthContext } from '../../../context/AuthContext'
import Pagetitle from '../../../widgets/Pagetitle'
import PrivateHeader from '../PrivateHeader'
import Sidebar from '../sidebar/Sidebar'
import Spinner from '../../../widgets/Spinner'
import TableHeader from '../../../widgets/TableHeader'
import BranchesList from './BranchesList'
import Search from '../../../widgets/Search'
import Pagination from '../../../widgets/Pagination'
import NumRows from '../../../widgets/NumRows'
import MBranchesList from './MBranchesList'
import NewbranchForm from './NewbranchForm' 
import { DataContext } from '../../../context/DataContext'

const columns = [
    {
        name:'Category',
        field: 'category',
        sortable: true
    }, 
    {
        name:'Name',
        field:'title',
        sortable:true
    }, 
    {
        name:'Mobile',
        field:'mobile',
        sortable:true
    }, 
    {
        name:'Email',
        field:'email',
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

const Branches = () => {

    const { token, logout, user, role } = useContext(AuthContext);
    const { record } = useContext(DataContext);

    const [branches, setBranches] = useState(null);
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

    const branchesData = useMemo(() => {

        if(branches !== null && branches !== undefined){

            let computedBranches = branches;

            if(search) {
                computedBranches = computedBranches.filter(
                    branch => branch.category.toLowerCase().includes(search.toLowerCase()) ||
                            branch.title.toLowerCase().includes(search.toLowerCase()) ||
                            branch.mobile.includes(search)
                )
            }

            setTotalItems(computedBranches.length);

            //Sorting
            if( sorting.field ){
                const reversed = sorting.order === "asc" ? 1 : -1;
                computedBranches = computedBranches.sort(
                    (a, b) =>
                        reversed * a[sorting.field].localeCompare(b[sorting.field])
                );
            }

            if(itemsPerPage === '0'){
                return computedBranches;
            }
            else{
                return computedBranches.slice(
                    (currentPage - 1) * ITEMS_PER_PAGE,
                    (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
                );
            }
        }

    }, [branches, currentPage, search, sorting, ITEMS_PER_PAGE, itemsPerPage])


    useEffect(() => {

        getBranches(token, setBranches, setError);
    }, [token, isCreated, record])
    

    return (
        <div>
            <PrivateHeader />
            <div className='w-full grid grid-cols-8'>
                <Sidebar />
                <div className='w-full col-span-8 lg:col-span-7 px-4 lg:px-10'>
                    <Pagetitle icon={<HiOutlineOfficeBuilding />} />
                    <div className='w-full px-2 lg:px-4 my-8'>

                        {/* Display an add button if user has enough privilege*/}
                        {(user && user.groupid === 0 && role === 'admin') &&
                            <div className='flex justify-end my-2'>
                                <button
                                    className='w-[120px] bg-transparent dark:bg-slate-500 dark:text-white p-2 border border-slate-500 text-slate-500 text-sm rounded-full flex justify-center space-x-1'
                                    onClick={showForm}
                                >
                                    <BsPlusLg size={12} className="mt-1" /><span>Branch</span>
                                </button>
                            </div>
                        }
                    
                    </div>
                    
                    {/* SEARCH COMPONENT */}
                    {(branches !== null && branches !== undefined && branches.length > 0) && 
                        <div className='w-full flex justify-end my-4'>
                            <Search onSearch={ (value) => {
                                setSearch(value);
                        }} />
                        </div>
                    }
                    
                    {/* NUM ROWS AND PAGINATION COMPONENTS */}
                    <div className='w-full flex justify-between mt-8 mb-4'>
                        {(branches !== null && branches !== undefined && branches.length > 0) && 
                            <NumRows 
                                data={branches} 
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

                    {/* Diplay data in table or cards depending on the screen size */}
                    {branches === null ? <Spinner w='250' /> : 
                        branches === undefined ? 
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
                                        <BranchesList brnchs={branchesData} />
                                    </table>       
                                </div> 

                                {/* SMALL SCREEN */}
                                <div className='w-full py-3 md:hidden'>
                                    <MBranchesList brnchs={branchesData} />
                                </div>
                            </Fragment>
                                  
                    }
                    
                    {/* PAGINATION COMPONENTS */}
                    <div className='w-full flex justify-end mt-6'>
                        <Pagination 
                            total={totalItems}
                            itemsPerPage={ITEMS_PER_PAGE}
                            currentPage={currentPage}
                            onPageChange={page => setCurrentPage(page)}
                        />
                    </div>
                </div>
            </div>  

            {form && <NewbranchForm setForm={setForm} setIsCreated={setIsCreated} />}
        </div>  
    )
}

export default Branches
