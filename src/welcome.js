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
// import  { BrowserRouter } from 'react-router-dom';

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

// all JSX - what I want to appear on the screen
// must be contained within one element
// inside of hashRoute                 --if the url is /, then render Registration
// --if the url is /login. then render the Login component
//

// browser router user browser history API
// user can change the url without making the request to server at all
//history.pushState({message: 'hahahahha'}, 'Joker', '/wiki/JOker')
// PART 4
// users own profile
// components
// 1. Profile = gets passed all user info from App plus functions
// for showing the uploader (which it will pass to the profile pic child)
// and setting the Bio which it will pass to Bio
// 2. Bio - get passed a function for setting the bio
// 1. Will have to be a class
// <BrowserRouter>
//     <div>
//         <Route path='/user/:id' component={User}/>
//     </div>
// </BrowserRouter>
