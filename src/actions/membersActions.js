import axios from "../api/axios"

export const getMembers = async ( token, setMembers, setError ) => {

    try{
        const response = await axios.get('members',
            {
                headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
            }
        );
        
        setMembers(response.data.members);
        console.log(response.data.members);

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


export const loadMembers = async ( token, setMembers, setError ) => {

    try{
        const response = await axios.get('get-members',
            {
                headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
            }
        );
        
        setMembers(response.data.members);
        console.log(response.data.members);

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


export const createMember = async ( token, data, setSuccess, setError, setSubmitting) => {

    setSubmitting(true);

    try{
        const response = await axios.post('create-member',
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


export const updateMember = async ( token, data, setSuccess, setError, setSubmitting) => {

    setSubmitting(true);

    try{
        const response = await axios.post('update-member',
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


export const deleteMember = async (token, id, setSuccess, setError ) => {

    try{

        const data = {
            id
        }

        console.log(id);

        const response = await axios.post('delete-member',
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