import React from 'react'
import Event from './Event'

const EventsList = ({ events }) => {


    return (
        <tbody>
            {events.map((evnt) => {
                return (
                    <Event evnt={evnt} key={evnt.id} />
                )
            })}
        </tbody>
    )
}

export default EventsList
