import React, { useEffect, useState } from 'react'
import { listGroups } from '../actions/branchesActions';

const GroupsList = () => {

    const [groups, setGroups] = useState(null);

    useEffect(() => {

        listGroups(setGroups);
    }, [])

    return (
        groups !== null && groups !== undefined ? groups.map(group => {
            return (
                <option value={group.id} key={group.id}>{group.title}</option>
            )
        }) : ''
           
    )
}

export default GroupsList