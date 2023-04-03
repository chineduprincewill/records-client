import axios from "../api/axios"

export const getDonationRedemptions = async ( token, id, setRedemptions, setError) => {

    const data = {
        donation_id : id
    }

    try{
        const response = await axios.post('donation-redemptions',
            data,
            {
                headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
            }
        );
        
        setRedemptions(response.data.redemptions);

    }
    catch (err) {
        if (!err?.response) {
            setError('No Response from Server');
        } else {
            console.log(err.response.data.error);
            setError(err.response.data.error);
        }
    }
}


export const redeemDonation = async ( token, data, setSuccess, setError, setSubmitting) => {

    setSubmitting(true);

    try{
        const response = await axios.post('redeem-donation',
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