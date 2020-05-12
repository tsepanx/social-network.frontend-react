import React from "react";
import CountryInfo from "./CountryInfo";

const InfoItems = (props) => {

    let items = props.list.map((value, index) =>
        <CountryInfo
            key={index}
            args={value}
        />)

    return (
        <div>
            {items}
        </div>
    )
}

export default InfoItems