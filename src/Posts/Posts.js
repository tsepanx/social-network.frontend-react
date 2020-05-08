import React from "react";
import s from './Posts.module.css'

import Card from "./Card/Card";

const Posts = (props) => {
    const cards = props.state.items.map((card, index) =>
        <Card
            key={index}
            id={index}
            addCard={props.addCard}
            updateCard={props.updateCard}
            state={card}>
        </Card>
    )

    return (
        <div className={s.posts}>
            Posts
            { cards }
        </div>
    )
}

export default Posts