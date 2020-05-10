import React from "react";

const CountryInfo = (props) => {
    return (
        <div className='card'>
            <div className='card-header'>{props.name}</div>
            <div className='card-body'>
                Body
            </div>
        </div>
    )
}

export default CountryInfo