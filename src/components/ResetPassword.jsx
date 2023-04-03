import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { resetPassword } from '../actions/passwordAction';
import Laptop from '../assets/laptop.jpg'
import Spinner from "./widgets/Spinner";


const ResetPassword = () => {

    const url = window.location.href;
    let res = url.split('#');

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirm, setConfirm] = useState();
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const body = {
            token : res[1],
            email,
            password,
            password_confirmation : confirm
        }

        resetPassword(body, setSuccess, setError, setSubmitting);

    }

    return (
        <div className="w-full bg-white py-16 px-4">
            <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
                <img className="w-[500px] mx-auto my-4" src={Laptop} alt="/" />
                <div className="flex flex-col justify-center">
                    <form onSubmit={handleSubmit}>
                        <h1 className="md:text-4xl text-3xl text-center md:text-left font-bold my-2 py-2">Reset Password !</h1>
                        {success !== null && <span className="w-full bg-green-100 p-2 rounded-md text-green-800 my-2 text-sm">Password successfully reset! Click <Link to="/login"><strong>here</strong></Link> to login</span>}
                        {error !== null && <span className="text-[red] text-sm py-1">{error}</span>}
                        <p className="my-4">
                            <input 
                                className="p-3 flex w-full rounded-md text-black border border-gray-900" 
                                type="email" 
                                placeholder="Enter email" 
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </p>
                        <p className="my-4">
                            <input 
                                className="p-3 flex w-full rounded-md text-black border border-gray-900" 
                                type="password" 
                                placeholder="New password" 
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </p>
                        <p className="my-4">
                            <input 
                                className="p-3 flex w-full rounded-md text-black border border-gray-900" 
                                type="password" 
                                placeholder="Confirm password" 
                                required
                                onChange={(e) => setConfirm(e.target.value)}
                            />
                        </p>
                        <div className="mb-0">
                            <p className="text-sm pb-2 text-right text-gray-500">Already have an Account?<Link to="/login"><span className="text-[#00df9a]"> Login here</span></Link></p>
                        </div>
                        {submitting ? <Spinner w={135} /> : 
                            <button 
                                className="bg-black text-[#00df9a] w-full rounded-md font-medium md:mx-0 py-3"
                                type="submit"
                            >
                                Submit
                            </button>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
