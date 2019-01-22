import React from 'react';
import { Link } from 'react-router-dom';



export default class Back extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrowVisible: false
        };
        this.goBack = this.goBack.bind(this);
    }

    goBack() {
        console.log("goback function running");
        this.props.history.push('/');
    }

    render() {
        return (
            <img onClick={this.goBack} className="back-arrow" src="/back-arrow.png"></img>
        );
    }

}
