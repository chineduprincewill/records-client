import React from "react";
import { Link } from "react-router-dom";

const SelfService = () => {

    return (
        <div className="text-white">
            <div className="max-w-[1240px] w-full mx-auto grid md:grid-cols-2 py-4">
                <div className="md:w-[600px] p-3 my-8 md:my-24 md:border md:border-black md:border-r-gray-700">
                    <p className="text-[#00df9a] text-3xl my-0 font-bold">A Taxpayer?</p>
                    <h1 className="md:text-4xl text-3xl py-4">
                        Provide your Taxpayer Unique ID and registered mobile number to view your taxes
                    </h1>
                    <p className="text-6xl text-[#ff8539] py-2">OR</p>
                    <p className="my-8"><Link to="/login" className="bg-transparent w-[200px] rounded-md border border-white font-medium my-6 mx-auto py-4 px-8 text-white">Click here to login</Link></p>
                </div>
                <div className="p-3 md:my-36">
                    <p className="my-4">
                        <input className="p-3 flex w-full rounded-md text-black border border-gray-900" type="text" placeholder="Enter your Taxpayer Unique ID" />
                    </p>
                    <p className="mt-8 mb-4">
                        <input className="p-3 flex w-full rounded-md text-black border border-gray-900" type="text" placeholder="Enter mobile no." />
                    </p>
                    <button className="bg-transparent text-white w-full rounded-md border border-white font-medium my-4 md:mx-0 py-3">Continue</button>
                </div>
            </div>
        </div>
    )
}

export default SelfService