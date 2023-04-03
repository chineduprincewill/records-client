import React, { Fragment } from 'react'

export const YearsList = () => {

    const currentYear = new Date().getFullYear();

    let years = [];

    for(let i = 1983; i <= currentYear; i++){
        years.push(i);
    }

    return (
        <Fragment>
            {
                years.map(year => {
                    return <option value={year}>{year}</option>
                }) 
            }
        </Fragment>
    )
}

export default YearsList
