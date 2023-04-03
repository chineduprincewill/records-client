import axios from "../api/axios"

export const getEvents = async ( token, setEvents, setError ) => {

    try{
        const response = await axios.get('events',
            {
                headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
            }
        );
        
        setEvents(response.data.events);

    }
    catch (err) {
        if (!err?.response) {
            setError('No Response from Server');
        } else {
            console.log(err.response.data);
            setError(err.response.data.error);
        }
    }
    
}


export const createEvent = async ( token, data, setSuccess, setError, setSubmitting) => {

    setSubmitting(true);

    try{
        const response = await axios.post('create-event',
            data,
            {
                headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
            }
        );
        
        setSuccess(response.data.success);

    }
    catch (err) {
        if (!err?.response) {
            setError('No Response from Server');
        } else {
            console.log(err.response.data.error);
            setError(err.response.data.error);
        }
    }

    setSubmitting(false);
}


export const updateEvent = async ( token, data, setSuccess, setError, setSubmitting) => {

    setSubmitting(true);

    try{
        const response = await axios.post('update-event',
            data,
            {
                headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
            }
        );
        
        setSuccess(response.data.success);

    }
    catch (err) {
        if (!err?.response) {
            setError('No Response from Server');
        } else {
            console.log(err.response.data.error);
            setError(err.response.data.error);
        }
    }

    setSubmitting(false);
}



export const deleteEvent = async (token, id, setSuccess, setError ) => {

    try{

        const data = {
            id
        }

        console.log(id);

        const response = await axios.post('delete-event',
            data,
            {
                headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
            }
        );

        setSuccess(response.data.success);

    } catch (err) {
        if (!err?.response) {
            setError('No Server Response');
        } else {
            setError(err.response.data.error);
        }
    }
}