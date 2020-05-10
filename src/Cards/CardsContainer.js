import React from "react";
import {connect} from "react-redux";
import Cards from "./Cards";


let mapStateToProps = (state) => {
    // debugger
    return {
        items: state.cards.items,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        dispatch: dispatch
    }
}

const CardsContainer = connect(mapStateToProps, mapDispatchToProps)(Cards);

export default CardsContainer;