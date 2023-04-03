import React from 'react'
import Branch from './Branch'

const BranchesList = ({ brnchs }) => {


    return (
        <tbody>
            {brnchs.map((brnch) => {
                return (
                    <Branch brnch={brnch} key={brnch.id} />
                )
            })}
        </tbody> 
    )
}

export default BranchesList
