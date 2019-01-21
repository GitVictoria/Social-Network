import React from 'react';


export default class Back extends React.Component {
    constructor() {
        super();
        this.state = {
            arrowVisible: false
        };
    }

    render() {
        return (
            <img className="back-arrow" src="/back-arrow.png"></img>
        );
    }

}
