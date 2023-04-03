import React, { useEffect, useState } from 'react'
import { listBranches } from '../actions/branchesActions';

export const BranchesList = () => {

    const [branches, setBranches] = useState(null);

    useEffect(() => {

        listBranches(setBranches);
    }, [])

    return (
        branches !== null && branches !== undefined ? branches.map(branch => {
            return (
                <option value={branch.id} key={branch.id}>{branch.title}</option>
            )
        }) : ''
           
    )
}

export default BranchesList
