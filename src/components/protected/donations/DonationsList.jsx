import React, { Fragment } from 'react'
import Donation from './Donation'
import Mdonation from './Mdonation'

const DonationsList = ({ dntns, view }) => {

    return (
        view === 'web' ? 
        <tbody>
            {dntns.map((dntn) => {
                return (
                    <Donation dntn={dntn} key={dntn.id} />
                )
            })}
        </tbody> 
        :
        <Fragment>
            {dntns.map((dntn) => {
                return (          
                    <Mdonation dntn={dntn} key={dntn.id} />
                )
            })}
        </Fragment>
    )
}

export default DonationsList
