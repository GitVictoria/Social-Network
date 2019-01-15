import React from 'react';
import Registration from './registration';
import Login from './login';
import  { HashRouter, Route } from 'react-router-dom';

export default function Welcome() {
    return (

        <div className="welcome-container">

            <img className="welcome-logo" src="Hanger.jpg"/>
            <HashRouter>
                <div>
                    <Route exact path = '/' component = { Registration } />
                    <Route path = '/login' component = { Login } />
                </div>
            </HashRouter>
        </div>



    );
}
