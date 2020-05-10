import React from "react";
import CountryInfo from "./CountryInfo";

const InfoItems = (props) => {
    console.log(props)

    let items = props.list.map(value => <CountryInfo name={value.country}/>)

    return (
        <div>
            {items}
        </div>
    )
}

export default InfoItems