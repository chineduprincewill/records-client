import React from 'react'
import { Link } from 'react-router-dom'
import Typed from 'react-typed'
import PublicHeader from './PublicHeader'
import homeBanner from '../assets/home-banner.png';

const AboutUs = () => {
    return (
        <div>
            <PublicHeader />
            <div className='grid lg:grid-cols-7 mt-6 z-50'>
                <div className='col-span-5 px-5 lg:pl-48 lg:pr-0 my-8'>
                    <div className="flex justify-left items-left">
                        <Typed 
                            className="text-red-500 text-xl"
                            strings={[
                                'Thou art worthy O Lord', 
                                'to receive glory, honour and power', 
                                'for Thou has created all things',
                                'and for Thy pleasure they are',
                                'and were created!'
                            ]}
                            typeSpeed={120}
                            backSpeed={35}
                            loop
                        />
                    </div>
                    <div className='w-full text-5xl lg:text-8xl my-3 leading-[60px] lg:leading-[100px]'>Living Christ <br />Financial Records App</div>
                    <Link to="/login">
                        <button 
                            className="w-[40%] bg-transparent p-3 border border-blue-500 rounded-full my-4 lg:my-12"
                        >
                            Sign in
                        </button>
                    </Link>
                </div>
                <div className='flex justify-end col-span-4 lg:col-span-2 lg:pr-48 lg:pl-0 lg:mt-12'>
                    <img src={homeBanner} alt="home-banner" className='w-[90%] lg:w-full' />
                </div>
            </div>
            
        </div>
        
    )
}

export default AboutUs
