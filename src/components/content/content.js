import {Route} from "react-router-dom";
import React from "react";

import {compose} from "redux";
import contentComponents from './content-items'

let routeItems = Object.values(contentComponents).map((value, index) => {
    const component = value[0]
    const path = value[1]

    return (
        <Route
            key={index}
            exact path={path}
            component={component}
        />
    )
})

let Content = () => {
    return (<>
        {routeItems}
    </>)
}

export default compose(
    // withAuth
)(Content)