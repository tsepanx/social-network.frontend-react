import React, {useEffect} from "react";
import * as axios from "axios";
import {connect} from "react-redux";

import s from './Info.module.css'

import {setInfoItemsCreator} from "../redux/info-reducer";
import InfoItems from "./InfoItems";

const InfoContainer = (props) => {

    useEffect(() => {
        axios.get('https://corona.lmao.ninja/v2/countries/Russia').then(
            response => {
                props.setInfoItems([response.data])
                console.log(response.data)
            }
        )
    }, [])

    return (
        <div>
            Some Info
            <div>
                <InfoItems list={props.items}/>
            </div>
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