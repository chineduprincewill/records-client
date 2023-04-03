import React, { useContext, useEffect, useState } from 'react'
import { getEvents } from '../actions/eventsActions';
import { AuthContext } from '../context/AuthContext';

const EventsList = () => {

    const { token } = useContext(AuthContext);
    
    const [events, setEvents] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {

        getEvents(token, setEvents, setError);
    }, [token])

    return (
        events !== null && events !== undefined ? events.map(event => {
            return (
                <option value={event.title} key={event.id}>{event.title}</option>
            )
        }) : error
           
    )
}

export default EventsList
