import React, { useEffect, useMemo, useState } from 'react'

const Pagination = ({ total=0, itemsPerPage=10, currentPage=1, onPageChange }) => {

    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        if(total > 0 && itemsPerPage > 0){
            setTotalPages(Math.ceil(total / itemsPerPage))
        }

    }, [total, itemsPerPage])

    const paginationItems = useMemo(() => {
        const pages = [];

        for (let i = 1; i <= totalPages; i++){
            pages.push(<span 
                className={`px-2 pt-1 text-sm cursor-pointer ${i === currentPage && ' bg-slate-500 dark:bg-transparent text-gray-200 font-medium rounded-sm'}`} 
                key={i}
                onClick={() => onPageChange(i)}
            >
                {i}
            </span>);
        }

        return pages

    }, [totalPages, currentPage, onPageChange])

    if( totalPages === 0 ) return null;

    return (
        <div>
            <div className='flex px-1 py-1 text-gray-700 dark:text-gray-500'>
                <span 
                    className='py-0 px-2 cursor-pointer bg-transparent text-md font-medium'
                    onClick={() => currentPage !== 1 && onPageChange(currentPage - 1)}
                >
                    {'<<'}
                </span>
                {paginationItems}
                <span 
                    className='py-0 px-2 cursor-pointer bg-transparent text-md font-medium'
                    onClick={() => currentPage !== totalPages && onPageChange(currentPage + 1)}
                >
                    {'>>'}
                </span> 
            </div>
        </div>
    )
}

export default Pagination
