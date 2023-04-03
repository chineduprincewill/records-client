import axios from "../api/axios"

export const getBranches = async ( token, setBranches, setError ) => {

    try{
        const response = await axios.get('groups',
            {
                headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
            }
        );
        
        setBranches(response.data.groups);
        console.log(response.data.groups);

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


export const listBranches = async ( setBranches ) => {

    try{
        const response = await axios.get('list-branches',
            {
                headers: { 'Accept' : 'application/json' }
            }
        );
        
        setBranches(response.data.branches);
        console.log(response.data.branches);

    }
    catch (err) {
        if (!err?.response) {
            console.log('No Response from Server');
        } else {
            console.log(err.response.data);
            console.log(err.response.data.error);
        }
    }
    
}


export const listGroups = async ( setGroups ) => {

    try{
        const response = await axios.get('list-groups',
            {
                headers: { 'Accept' : 'application/json' }
            }
        );
        
        setGroups(response.data.groups);
        console.log(response.data.groups);

    }
    catch (err) {
        if (!err?.response) {
            console.log('No Response from Server');
        } else {
            console.log(err.response.data);
            console.log(err.response.data.error);
        }
    }
    
}


export const createBranch = async ( token, data, setSuccess, setError, setSubmitting) => {

    setSubmitting(true);

    try{
        const response = await axios.post('create-group',
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


export const updateBranch = async ( token, data, setSuccess, setError, setSubmitting) => {

    setSubmitting(true);

    try{
        const response = await axios.post('update-group',
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


export const deleteBranch = async (token, id, setSuccess, setError ) => {

    try{

        const data = {
            id
        }

        console.log(id);

        const response = await axios.post('delete-group',
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