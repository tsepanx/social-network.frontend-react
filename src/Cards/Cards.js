import React from "react";
import s from './Cards.module.css'

import {cardAction} from "../redux/cards-reducer";
import Card from "./Card/Card";

const Cards = (props) => {
    const cards = props.items.map((cardItem, index) =>
        <Card
            key={index}
            id={index}
            dispatch={props.dispatch}
            state={cardItem}>
        </Card>
    )

    const addNewCard = () => {
        props.dispatch({type: cardAction.ADD_CARD})
    }

    return (
        <div className={s.posts}>
            <div onClick={addNewCard} className={'btn btn-success ' + s.btnNew}>Add New</div>
            { cards }
        </div>
    )
}

export default Cards