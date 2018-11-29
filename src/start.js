import React from "react";
import ReactDOM from "react-dom";
import Welcome from './welcome';
import Main from './main';


let component;

//the bellow should only be called once in whole project
// location.pathname is a url
if (location.pathname == '/welcome') {
    component = <Welcome/>; }
else {
    component = <Main/>;
    // render welcome
}
ReactDOM.render(
    component,
    document.querySelector("main")); // first component


// function HelloWorld() {
//     return <div>Hello, World!</div>;
// }

// className={'pretty + Date.now()'}
// state is a javascript object
// state is like the data in view
// functional compenent dont have state
// everything we use in render function and we want USER to see, we have to put in state

// composition notes
// composing is putting components inside of componenets (nesting)
// presentational componenets -> only show or 'present'
// container component -> functional, smart, define behaviour 
