import React, { useContext, useEffect, useMemo, useState } from 'react'
import { getEvents } from '../actions/eventsActions';
import { AuthContext } from '../context/AuthContext';

export const FilterEvents = ({ setEvent, clear }) => {

    const { token, logout } = useContext(AuthContext);
    
    const [events, setEvents] = useState(null);
    const [error, setError] = useState(null);
    const [filtered, setFiltered] = useState('');
    const [selected, setSelected] = useState('');
    const [isSelected, setIsSelected] = useState(false);

    const selectedValue = (e) => {
        setIsSelected(true);
        setFiltered('');
        setEvent(e);
        setSelected(e);
    }

    const updateFilter = (e) => {
        setIsSelected(false);
        setFiltered(e);
    }

    const eventsData = useMemo(() => {

        if(events !== null && events !== undefined){
            let computedEvents = events;
    
            if(filtered) {
                computedEvents = computedEvents.filter(
                    evnt => evnt.title.toLowerCase().includes(filtered.toLowerCase())
                )
            }
            
            return computedEvents;
        }
    }, [events, filtered])


    useEffect(() => {

        getEvents(token, setEvents, setError);

        if(clear){
            setIsSelected(false);
            setFiltered('');
            setEvent('');
            setSelected('');
        }

        if(error !== null){
            alert(error);
            setError(null);
        }
    }, [token, clear, error, setEvent])


    return (
        <div className='absolute'>
            <input
                type="text"
                className="w-[250px] bg-transparent p-2 border border-gray-400 dark:border-slate-700 dark:text-gray-500 text-sm"
                value={isSelected ? selected : filtered}
                placeholder="Type and click on event to select"
                onChange={(e) => updateFilter(e.target.value)}
            />
            <div className='relative inset-0 overflow-y-auto w-full'>
                <div className={`${filtered === '' ? 'hidden' : 'block'} bg-gray-100 dark:bg-gray-800 mt-0 p-2 text-gray-600 dark:text-gray-400 text-sm border-b border-x border-gray-200 dark:border-gray-900`}>
                    {
                        events !== undefined ? (
                            filtered !== '' && (
                                (eventsData !== null && eventsData !== undefined) && 
                                    eventsData.map(evndta => {
                                    return <p 
                                            key={evndta.id}
                                            className='w-full my-1 cursor-pointer'
                                            onClick={(e) => selectedValue(evndta.title)}
                                        >
                                            {evndta.title}
                                        </p>
                                    })
                            )
                        ) : logout()     
                    }
                </div>
            </div>
        </div>
    )
}

export default FilterEvents
