import React from 'react'

const NextSearch = ({ setSearch, val, btnText }) => {
  return (
    <button 
        className='w-[80px] p-1.5 border border-slate-600 bg-transparent text-slate-600 dark:bg-slate-600 dark:text-white dark:hover:bg-transparent dark:hover:text-slate-600 rounded-full hover:bg-slate-600 hover:text-white ml-64 mr-2 md:mr-4'
        onClick={(e) => setSearch(val)}
    >
        {btnText}
    </button>
  )
}

export default NextSearch
