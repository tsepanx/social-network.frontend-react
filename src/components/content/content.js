import {compose} from "redux";
import {contentComponents} from "../header/header";
import {Route} from "react-router-dom";
import React from "react";

let routeItems = contentComponents.map((value, index) => {

    let isExact = !('exact' in value && !value.exact)
    // let isExact = false

    if (isExact) {
        return (<Route
            key={index}
            exact path={value.path}
            component={value.component}
        />)
    } else {
        return (<Route
            key={index}
            path={value.path}
            component={value.component}
        />)
    }
})

let Content = () => {
    return (<>
        {routeItems}
    </>)
}

export default compose(
    // withAuth
)(Content)