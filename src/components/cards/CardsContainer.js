import React from "react";
import {connect} from "react-redux";
import Cards from "./Cards";
import {addCardCreator, updateCardCreator} from "../../redux/cards-reducer";


let mapStateToProps = (state) => {
    return {
        items: state.cards.items,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addCard: () => {
            dispatch(addCardCreator());
        },
        updateCard: (id, updatedState) => {
            dispatch(updateCardCreator(id, updatedState))
        }
    }
}

const CardsContainer = connect(mapStateToProps, mapDispatchToProps)(Cards);

export default CardsContainer;