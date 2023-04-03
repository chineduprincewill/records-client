import React, { Fragment } from 'react'
import Member from './Member'
import Mmember from './Mmember'

const MembersList = ({ membrs, view }) => {

    return (
        view === 'web' ? 
        <tbody>
            {membrs.map((membr) => {
                return (
                    <Member membr={membr} key={membr.id} />
                )
            })}
        </tbody> 
        :
        <Fragment>
            {membrs.map((membr) => {
                return (          
                    <Mmember membr={membr} key={membr.id} />
                )
            })}
        </Fragment>
    )
}

export default MembersList
