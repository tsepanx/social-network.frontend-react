import React, {useEffect, useState} from "react";
import s from './Card.module.css'

import {cardAction} from "../../redux/cards-reducer";
import CardButton from "./CardButton/CardButton";

const Card = (props) => {

    const updateSelf = () => {
        props.dispatch({
            type: cardAction.UPDATE_CARD,
            id: props.id,
            updatedState: props.state
        })
    }

    const updateIsCompleted = (isCompleted) => {
        props.state.isCompleted = isCompleted
        updateSelf()
    }

    return (
        <div>
            <div className="card text-left" style={{width: '20rem'}}>
                <div className="card-header card-title">{props.state.title}</div>

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