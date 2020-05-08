import React from "react";
import s from './Cards.module.css'

import {typeEnum} from "../state";
import Card from "./Card/Card";

const Cards = (props) => {
    const cards = props.state.items.map((cardItem, index) =>
        <Card
            key={index}
            id={index}
            dispatch={props.dispatch}
            state={cardItem}>
        </Card>
    )

    const addNewCard = () => {
        console.log(typeEnum, 'aaa')
        // debugger
        props.dispatch({type: typeEnum.ADD_CARD})
    }

    return (
        <div className={s.posts}>
            <div onClick={addNewCard} className='btn btn-success'>Add New</div>
            Posts
            { cards }
        </div>
    )
}

export default Cards