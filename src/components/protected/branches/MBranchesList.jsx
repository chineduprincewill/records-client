import React from 'react'
import MBranch from './MBranch'

const MBranchesList = ({ brnchs }) => {

    return (
        <div>
            {brnchs.map((brnch) => {
                return (
                    <MBranch brnch={brnch} key={brnch.id} />
                )
            })}
        </div>
    )
}

export default MBranchesList
