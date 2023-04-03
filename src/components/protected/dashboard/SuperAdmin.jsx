import React from 'react'
import { AiOutlineUser, AiOutlineWindows } from 'react-icons/ai'
import { HiOutlineOfficeBuilding, HiOutlineUserGroup } from 'react-icons/hi'
import Stats from '../../../widgets/Stats'

const SuperAdmin = () => {

    return (
        <div className='w-full px-2 lg:px-4 my-8 grid md:flex md:flex-wrap md:justify-between'>
            <Stats icon={<AiOutlineWindows size={40} className="text-slate-500" />} title='Total Events' num={17} />
            <Stats icon={<AiOutlineUser size={40} className="text-slate-500" />} title='Total Members' num={54273} />
            <Stats icon={<HiOutlineOfficeBuilding size={40} className="text-slate-500" />} title='Total Branches' num={30} />
            <Stats icon={<HiOutlineUserGroup size={40} className="text-slate-500" />} title='Total Users' num={32} />            
        </div>
    )
}

export default SuperAdmin
