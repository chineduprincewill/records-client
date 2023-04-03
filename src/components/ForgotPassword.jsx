import React, { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../actions/passwordAction";
import Laptop from '../assets/laptop.jpg'
import Spinner from "./widgets/Spinner";

const ForgotPassword = () => {

    const [email, setEmail] = useState();
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();

        forgotPassword(email, setSuccess, setError, setSubmitting);
    }

    return (
        <div className="w-full bg-white py-16 px-4">
            <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
                <img className="w-[500px] mx-auto my-4" src={Laptop} alt="/" />
                <div className="flex flex-col justify-center">
                    <form onSubmit={handleSubmit}>
                        <h1 className="md:text-4xl text-3xl text-center md:text-left font-bold my-2 py-2">Forgot Password ?</h1>
                        {success !== null && <span className="text-[green] text-sm py-1">{success}</span>}
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

export default ForgotPassword