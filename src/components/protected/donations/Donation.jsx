import React, { Fragment, useState } from 'react'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import Moment from 'react-moment'
import Redemptions from '../redemptions/Redemptions';

const Donation = ({ dntn }) => {

    const [form, setForm] = useState(false);



    const showForm = () => {
        setForm(true);
    }

    return (
        <Fragment>
            <tr className="px-1 text-sm dark:text-gray-400 even:bg-gray-100 odd:bg-white dark:odd:bg-transparent dark:even:bg-[#131313]">
                <td className='py-3 px-3 whitespace-nowrap'>{dntn.fullname}</td>
                <td className='py-3 px-3 whitespace-nowrap'>{dntn.mobile}</td>
                <td className='py-3 px-3 whitespace-nowrap'>{dntn.event}, {dntn.event_year}</td>
                <td className='py-3 px-3 whitespace-nowrap'>&#8358; {dntn.donation}</td>
                <td className='py-3 px-3 whitespace-nowrap'>&#8358; {dntn.redeemed}</td>
                <td className='py-3 px-3 whitespace-nowrap'>{dntn.recorder}</td>
                <td className='py-3 px-3 whitespace-nowrap'><Moment format='MMMM Do YYYY'>{dntn.created_at}</Moment></td>
                <td className='py-3 px-3 whitespace-nowrap flex'>
                    <Fragment>
                        <span 
                            className='text-[#00df9a] cursor-pointer hover:text-green-800'
                            title="redemptions"
                            onClick={showForm}
                        >
                            <AiOutlineUnorderedList size={15} />
                        </span>
                    </Fragment>
                </td>
            </tr>

            {form && <Redemptions donation={dntn} setForm={setForm } />}
        </Fragment>
    )
}

export default Donation