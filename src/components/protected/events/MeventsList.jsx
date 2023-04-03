import React from 'react'
import Mevent from './Mevent'

const MeventsList = ({ events }) => {


    return (
        <div>
            {events.map((evnt) => {
                return (
                    <Mevent evnt={evnt} key={evnt.id} />
                )
            })}
        </div>
    )
}

export default MeventsList
