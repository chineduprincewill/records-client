import React from 'react'

const NumRows = ({ data, setItemsPerPage}) => {
  return (
    <select 
        className='w-[70px] p-1 bg-transparent border dark:border-slate-700 border-slate-400 text-gray-700 dark:text-gray-500  text-sm'
        onChange={(e) => data !== undefined && setItemsPerPage(e.target.value)}
    >
        <option value="10">rows</option>
        <option value='1'>1</option>
        <option value='5'>5</option>
        <option value='7'>7</option>
        <option value='10'>10</option>
        <option value='20'>20</option>
        <option value='50'>50</option>
        <option value='100'>100</option>
        <option value='0'>All</option>
    </select>
  )
}

export default NumRows
