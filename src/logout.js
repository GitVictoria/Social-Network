import React from 'react';
import axios from './axios';

export default class Logout extends React.Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        axios.get('/logout').then(resp => {
            console.log(resp);
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <a href="/">
                <button onClick={this.handleChange} className="logout" action="/" name="button">Log Out</button>
            </a>
        );
    }
}
