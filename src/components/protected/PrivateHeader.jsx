import React, { Fragment, useState } from 'react'
import Switcher from '../../Switcher'
import { HiUserCircle } from 'react-icons/hi'
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri'
import HeaderDropdown from '../../widgets/HeaderDropdown'

const PrivateHeader = () => {

    const [drop, setDrop] = useState(false);

    const showDropdown = () => {
        setDrop(!drop);
    }

    return (
        <Fragment>
            <div className="w-full bg-slate-500 z-40 flex sticky top-0 justify-end px-5 pt-3 space-x-8">
                <span className='flex text-gray-200 p-1'>
                    <HiUserCircle size={25} />   
                    {drop ? <RiArrowDropUpLine size={25} onClick={showDropdown} className="cursor-pointer" /> : <RiArrowDropDownLine size={25} onClick={showDropdown}  className="cursor-pointer" />} 
                </span> 
                <Switcher />
            </div>
            {drop && <HeaderDropdown />}
        </Fragment>
    )
}

export default PrivateHeader
