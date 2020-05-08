import React from "react";
import s from './Cards.module.css'

import Card from "./Card/Card";

const Cards = (props) => {
    const cards = props.state.items.map((cardItem, index) =>
        <Card
            key={index}
            id={index}
            addCard={props.addCard}
            updateCard={props.updateCard}
            state={cardItem}>
        </Card>
    )

    return (
        <div className={s.posts}>
            Posts
            { cards }
        </div>
    )
}

export default Cards