import React from "react";
import ReactDOM from "react-dom";
import Welcome from './welcome';
import App from './app';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import reducer from './reducers';
import { initSocket } from './socket';
import { composeWithDevTools } from 'redux-devtools-extension';



// ---------- BOILER PLATE FOR REDUX --------//

const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)) );

const elem = (
    <Provider store ={ store }>
        <App />
    </Provider>
);

// ---------- END OF BOILER PLATE FOR REDUX --------//

let component;



//the bellow should only be called once in whole project
// location.pathname is a url
if (location.pathname == '/welcome') {
    component = <Welcome/>; }
else {
    component = (
        initSocket(store),
        <Provider store ={ store }>
            <App />
        </Provider>);
    // innitiate socket when app renders
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
