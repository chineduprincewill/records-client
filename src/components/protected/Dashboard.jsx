import React, { useContext } from 'react'
import { AiOutlineDashboard } from 'react-icons/ai';
import { AuthContext } from '../../context/AuthContext'
import Pagetitle from '../../widgets/Pagetitle';
import SuperAdmin from './dashboard/SuperAdmin';
import PrivateHeader from './PrivateHeader'
import Sidebar from './sidebar/Sidebar';

const Dashboard = () => {

    const { user } = useContext(AuthContext);


    return (
        <div>
            <PrivateHeader />
            <div className='w-full grid lg:grid-cols-8'>
                <Sidebar />
                <div className='w-full lg:col-span-7 lg:px-10'>
                    <Pagetitle icon={<AiOutlineDashboard />} />
                    {(user && user.groupid === "0" && user.role === 'admin') && <SuperAdmin />}
                </div>
            </div>  
        </div>
    )
}

export default Dashboard
