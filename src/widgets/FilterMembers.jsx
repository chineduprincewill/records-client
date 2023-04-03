import React, { useContext, useEffect, useMemo, useState } from 'react'
import { loadMembers } from '../actions/membersActions';
import { AuthContext } from '../context/AuthContext';

export const FilterMembers = ({ setMember, clear, setMemberName }) => {

    const { token, logout } = useContext(AuthContext);
    
    const [members, setMembers] = useState(null);
    const [error, setError] = useState(null);
    const [filtered, setFiltered] = useState('');
    const [selected, setSelected] = useState('');
    const [isSelected, setIsSelected] = useState(false);

    const selectedValue = (mbid, mbname) => {
        setIsSelected(true);
        setFiltered('');
        setMember(mbid);
        setSelected(mbname);
        setMemberName(mbname);
    }

    const updateFilter = (e) => {
        setIsSelected(false);
        setFiltered(e);
    }

    const membersData = useMemo(() => {

        if(members !== null && members !== undefined){
            let computedMembers = members;
    
            if(filtered) {
                computedMembers = computedMembers.filter(
                    membr => membr.fullname.toLowerCase().includes(filtered.toLowerCase())
                )
            }
            console.log(computedMembers);
            return computedMembers;
        }
    }, [members, filtered])


    useEffect(() => {

        loadMembers(token, setMembers, setError);

        if(clear){
            setIsSelected(false);
            setFiltered('');
            setMember('');
            setSelected('');
        }

        if(error !== null){
            alert(error);
            setError(null);
        }
    }, [token, clear, error, setMember])


    return (
        <div className='absolute'>
            <input
                type="text"
                className="w-[250px] bg-transparent p-2 border border-gray-400 dark:border-slate-700 dark:text-gray-500 text-sm"
                value={isSelected ? selected : filtered}
                placeholder="Type and click on member to select"
                onChange={(e) => updateFilter(e.target.value)}
            />
            <div className='relative inset-0 overflow-y-auto w-full'>
                <div className={`${filtered === '' ? 'hidden' : 'block'} bg-gray-100 dark:bg-gray-800 mt-0 p-2 text-gray-600 dark:text-gray-400 text-sm border-b border-x border-gray-200 dark:border-gray-900`}>
                    {
                        members !== undefined ? 
                            (filtered !== '' && (
                                membersData !== null && 
                                    membersData.map(memdta => {
                                    return <p 
                                            key={memdta.id}
                                            className='w-full my-1 cursor-pointer'
                                            onClick={(e) => selectedValue(memdta.id, memdta.fullname)}
                                        >
                                            {memdta.fullname}
                                        </p>
                                    })
                            )) 
                        : logout()  
                    }
                </div>
            </div>
        </div>
    )
}

export default FilterMembers
