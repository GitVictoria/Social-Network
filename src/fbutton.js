import React from 'react';
import axios from './axios';

export default class FriendButton extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        axios.get('/friendship');
    }

    render() {
        return (
            <div>
                <button className="friendbutton" onClick={this.makeRequest}/>
            </div>
        );
    }
}
