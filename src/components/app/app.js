import React from 'react';

import 'bootswatch/dist/darkly/bootstrap.min.css'

import './app.css';

import Header from "../header/header";
import Content from "../content/content";
import {withAuth} from "../hoc/with-auth";
import {compose} from "redux";

const App = () => {
    return (
        <div className="App">
            <div className='container'>
                <div className='row'>
                    <div className="col-12">
                        <Header/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 App-content">
                        <Content/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default compose(
    // withAuth(false)
)(App);