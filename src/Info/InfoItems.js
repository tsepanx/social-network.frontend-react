import React from "react";
import CountryInfo from "./CountryInfo";

const InfoItems = (props) => {

    let items = props.list.map(value => <CountryInfo args={value}/>)

    return (
        <div>
            {items}
        </div>
    )
}

export default InfoItems