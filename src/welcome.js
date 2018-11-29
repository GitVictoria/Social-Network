// it's job is to render registration component
// welcome component itself isn't determinening
// this is going to be a functional component - it doens't need to know whether the user is logged in or not
// functional component is display nly
// if it needs to do something it's a class Component

import React from 'react';
import Registration from './registration';
import Login from './login';
// React router: HashRouter, BrowerRouter
import  { HashRouter, Route } from 'react-router-dom';

export default function Welcome() {
    return (
        // all JSX - what I want to appear on the screen
        // must be contained within one element
        // inside of hashRoute                 --if the url is /, then render Registration
    // --if the url is /login. then render the Login component
    //
        <div className="welcome-container">
            <center><h1>Welcome To The Hang</h1>
                <img className="welcome-logo" src="Hanger.jpg"/></center>
            <HashRouter>
                <div>
                    <Route exact path = '/' component = { Registration } />
                    <Route path = '/login' component = { Login } />
                </div>
            </HashRouter>

        </div>
    );
}
