import React, { Fragment } from 'react'
import Muser from './Muser'
import User from './User'

const UsersList = ({ usrs, view }) => {

    return (
        view === 'web' ? 
        <tbody>
            {usrs.map((usr) => {
                return (
                    <User usr={usr} key={usr.id} />
                )
            })}
        </tbody> 
        :
        <Fragment>
            {usrs.map((usr) => {
                return (          
                    <Muser usr={usr} key={usr.id} />
                )
            })}
        </Fragment>
    )
}

export default UsersList
