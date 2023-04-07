import React, { useEffect, useMemo, useState } from 'react'

export const FilterYears = ({ setYear, clear }) => {
    
    const [filtered, setFiltered] = useState('');
    const [selected, setSelected] = useState('');
    const [isSelected, setIsSelected] = useState(false);

    const currentYear = new Date().getFullYear();

    let years = [];

    for(let i = 1983; i <= currentYear; i++){
        years.push(i);
    }

    const selectedValue = (e) => {
        setIsSelected(true);
        setFiltered('');
        setYear(e);
        setSelected(e);
    }

    const updateFilter = (e) => {
        setIsSelected(false);
        setFiltered(e);
    }

    const yearsData = useMemo(() => {

        if(years !== []){
            let computedYears = years;
    
            if(filtered) {
                computedYears = computedYears.filter(
                    yr => yr.toString().includes(filtered));
            }
            
            return computedYears;
        }

        // eslint-disable-next-line
    }, [filtered])

    useEffect(() => {
        if(clear){
            setIsSelected(false);
            setFiltered('');
            setYear('');
            setSelected('');
        }
    }, [clear, setYear])


    return (
        <div className='absolute'>
            <input
                type="text"
                className="w-[80px] bg-transparent p-2 border border-gray-400 dark:border-slate-700 dark:text-gray-400 text-sm"
                value={isSelected ? selected : filtered}
                placeholder="Type year"
                onChange={(e) => updateFilter(e.target.value)}
            />
            <div className='relative inset-0 z-10 overflow-y-auto w-[70px]'>
                <div className={`${filtered === '' ? 'hidden' : 'block'} bg-gray-100 dark:bg-gray-800 mt-0 p-2 text-gray-600 dark:text-gray-400 text-sm border-b border-x border-gray-200 dark:border-gray-900`}>
                    {
                        filtered !== '' && (
                            (yearsData !== null && yearsData !== undefined) && 
                                yearsData.map((yd, index) => {
                                return <p 
                                        key={index}
                                        className='my-1 cursor-pointer'
                                        onClick={(e) => selectedValue(yd)}
                                    >
                                        {yd}
                                    </p>
                                })
                        )    
                    }
                </div>
            </div>
            
        </div>
    )
}

export default FilterYears
