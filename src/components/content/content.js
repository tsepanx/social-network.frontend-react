import {compose} from "redux";
import {contentComponents} from "../header/header";
import {Route} from "react-router-dom";
import React from "react";

let routeItems = contentComponents.map((value, index) =>
    <Route
        key={index}
        path={value.path}
        render={() => value.component}
    />)

let Content = () => {
    return (<>
        {routeItems}
    </>)
}

export default compose(
    // withAuthRedirect
)(Content)