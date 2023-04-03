import React, { useState } from 'react'
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from 'react-icons/md'

const TableHeader = ({ columns, onSorting }) => {

    const [sortingField, setSortingField] = useState("");
    const [sortingOrder, setSortingOrder] = useState("asc");

    const onSortingChange = field => {
        const order = 
            field === sortingField && sortingOrder === "asc" ? "desc" : "asc";

        setSortingField(field);
        setSortingOrder(order);
        onSorting(field, order);
    }

    return (
            <thead>
                <tr className='border-b border-slate-300 dark:border-slate-700 text-slate-400 px-1'>
                    {columns.map(({ name, field, sortable }) => (
                            <td 
                                key={name}
                                className='py-3 px-3 whitespace-nowrap text-sm cursor-pointer'
                                onClick={() => sortable ? onSortingChange(field) : null} 
                            >
                                <div className='flex'>
                                    <span className='mr-1'>{name}</span>

                                    {sortingField && sortingField === field && (
                                        sortingOrder === "asc" 
                                            ? <MdOutlineArrowDropDown size={15} className="mt-1" /> 
                                            : <MdOutlineArrowDropUp size={15} className="mt-1" />
                                    )}
                                </div>
                            </td>
                    ))}
                </tr>
            </thead>
            
    )
}

export default TableHeader
