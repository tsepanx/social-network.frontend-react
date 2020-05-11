import React, {useEffect} from "react";
import * as axios from "axios";
import {connect} from "react-redux";

import s from './Info.module.css'

import {setInfoItemsCreator} from "../redux/info-reducer";
import InfoItems from "./InfoItems";

const InfoContainer = (props) => {

    const reloadBtn = React.createRef()

    const loadCountryInfo = () => {
        axios.get('https://corona.lmao.ninja/v2/countries/rus').then(
            response => {
                props.setInfoItems([response.data])
                console.log(response)
            }
        )
    }
    const onReloadClick = () => {
        props.setInfoItems([])
        loadCountryInfo()
    }

    return (
        <div>
            Some Info
            <div className='btn btn-success' onClick={onReloadClick} ref={reloadBtn}>Reload</div>
            <div><InfoItems list={props.items}/></div>
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        items: state.info.items,
    }
}


let mapDispatchToProps = (dispatch) => {
    return {
        setInfoItems: (items) => {
            dispatch(setInfoItemsCreator(items))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoContainer)