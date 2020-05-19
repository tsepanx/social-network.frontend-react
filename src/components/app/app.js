import React from 'react';
import {Route} from "react-router-dom";

import "bootswatch/dist/darkly/bootstrap.min.css"

import './app.css';

import Header from "../header/header";

import {contentComponents} from "../header/header";

let routeItems = contentComponents.map((value, index) =>
    <Route
        key={index}
        path={value.path}
        render={() => value.component}
    />)

const App = () => {
    return (
        <div className="App">

            <div className='row'>
                <div className="col-12">
                    <Header/>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="App-content">
                        {routeItems}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;