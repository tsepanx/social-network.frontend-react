import React from 'react';
import preloader from "../../../assets/preloader.svg";

let Preloader = ({width = 64}) => {
    return <div>
        <img src={preloader}  alt='Loading' style={{ width: width }}/>
    </div>
}

export default Preloader;