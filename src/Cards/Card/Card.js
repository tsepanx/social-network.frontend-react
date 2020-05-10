import React from "react";
import s from './Card.module.css'

import CardButton from "./CardButton/CardButton";

const Card = (props) => {

    const updateIsCompleted = (isCompleted) => {
        props.state.isCompleted = isCompleted
        props.updateCard(props.id, props.state)
    }

    return (
        <div>
            <div className={"card text-left text-white " + s.cardBody} style={{width: '20rem'}}>
                <div className="card-header text-white card-title">{props.state.title}</div>

                <div className={"card-body " + s.cardBody}>
                    <p className="card-text">{props.state.description}</p>
                    <hr/>
                    <CardButton
                        state={{isActive: props.state.isCompleted}}
                        updateIsCompleted={updateIsCompleted}
                    />
                </div>
            </div>
            <p/>
        </div>
    )
}


export default Card;