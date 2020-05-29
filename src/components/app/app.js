import React from 'react';

import 'bootswatch/dist/darkly/bootstrap.min.css'

import './app.css';

import Header from "../header/header";
import Content from "../content/content";

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
                    <div className="col-12">
                        <div className="App-content">
                            <Content/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;