import React, { Fragment, useContext, useEffect, useMemo, useState } from 'react'
import { HiOutlineUserGroup } from 'react-icons/hi'
import { getUsers } from '../../../actions/usersActions'
import { AuthContext } from '../../../context/AuthContext'
import Pagetitle from '../../../widgets/Pagetitle'
import PrivateHeader from '../PrivateHeader'
import Sidebar from '../sidebar/Sidebar'
import Spinner from '../../../widgets/Spinner'
import { BsPlusLg } from 'react-icons/bs'
import Search from '../../../widgets/Search'
import NumRows from '../../../widgets/NumRows'
import Pagination from '../../../widgets/Pagination'
import TableHeader from '../../../widgets/TableHeader'
import UsersList from './UsersList'
import NewuserForm from './NewuserForm'
import { DataContext } from '../../../context/DataContext'

const columns = [
    {
        name: 'Username',
        selector: row => row.username,
        sortable: true,
    },
    {
        name: 'Role',
        selector: row => row.role,
        sortable: true,
    },
    {
        name: 'Mobile',
        selector: row => row.mobile,
        sortable: true,
    },
    {
        name: 'Email',
        selector: row => row.email,
        sortable: true,
    },
    {
        name: 'Group',
        selector: row => row.groupname,
        sortable: true,
    },
    {
        name: 'Date',
        selector: row => row.created_at,
        sortable: true,
    }
];

const Users = () => {

    const { token, logout, user } = useContext(AuthContext);
    const { record } = useContext(DataContext);

    const [users, setUsers] = useState(null);
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

    const usersData = useMemo(() => {

        if(users !== null && users !== undefined){

            let computedUsers = users;

            if(search) {
                computedUsers = computedUsers.filter(
                    usr => usr.username.toLowerCase().includes(search.toLowerCase()) ||
                            usr.role.toLowerCase().includes(search.toLowerCase()) ||
                            usr.email.toLowerCase().includes(search.toLowerCase()) ||
                            usr.groupname.toLowerCase().includes(search.toLowerCase()) ||
                            usr.mobile.includes(search)
                )
            }

            setTotalItems(computedUsers.length);

            //Sorting
            if( sorting.field ){
                const reversed = sorting.order === "asc" ? 1 : -1;
                computedUsers = computedUsers.sort(
                    (a, b) =>
                        reversed * a[sorting.field].localeCompare(b[sorting.field])
                );
            }

            if(itemsPerPage === '0'){
                return computedUsers;
            }
            else{
                return computedUsers.slice(
                    (currentPage - 1) * ITEMS_PER_PAGE,
                    (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
                );
            }
        }

    }, [users, currentPage, search, sorting, ITEMS_PER_PAGE, itemsPerPage])

    useEffect(() => {
        getUsers(token, setUsers, setError);
    }, [token, isCreated, record])


    return (
        <div>
            <div>
                <PrivateHeader />
                <div className='w-full grid lg:grid-cols-8'>
                    <Sidebar />
                    <div className='w-full col-span-8 lg:col-span-7 px-4 lg:px-10'>
                        <Pagetitle icon={<HiOutlineUserGroup />} />
                        <div className='w-full px-2 lg:px-4 my-8'>
                            {/* Display an add button if user has enough privilege*/}
                            {(user && user.groupid === "0" && user.role === 'admin') &&
                                <div className='flex justify-end my-2'>
                                    <button
                                        className='w-[120px] bg-transparent dark:bg-slate-500 dark:text-white p-2 border border-slate-500 text-slate-500 text-sm rounded-full flex justify-center space-x-1'
                                        onClick={showForm}
                                    >
                                        <BsPlusLg size={12} className="mt-1" /><span>User</span>
                                    </button>
                                </div>
                            }
                        </div>

                        {/* SEARCH COMPONENT */}
                        {(users !== null && users !== undefined && users.length > 0) && 
                            <div className='w-full flex justify-end my-4'>
                                <Search onSearch={ (value) => {
                                    setSearch(value);
                            }} />
                            </div>
                        }
                        
                        {/* NUM ROWS AND PAGINATION COMPONENTS */}
                        <div className='w-full flex justify-between mt-8 mb-4'>
                            {(users !== null && users !== undefined && users.length > 0) && 
                                <NumRows 
                                    data={users} 
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
                        {users === null ? <Spinner w='250' /> : 
                            users === undefined ? 
                                logout() :
                                <Fragment>
                                    {/* LARGE SCREEN */}
                                    <div className='w-full overflow-auto hidden lg:block'> 
                                        <table className='w-full'>
                                            <TableHeader 
                                                columns={columns} 
                                                onSorting={(field, order) => 
                                                    setSorting({ field, order })
                                                } 
                                            />
                                            <UsersList usrs={usersData} view="web" />
                                        </table>       
                                    </div> 

                                    {/* SMALL SCREEN */}
                                    <div className='w-full py-3 lg:hidden'>
                                        <UsersList usrs={usersData} view="mobile" />
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
            </div>

            {form && <NewuserForm setForm={setForm} setIsCreated={setIsCreated} />}
        </div>
    )
}

export default Users
