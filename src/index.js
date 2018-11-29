import React from 'react';

class Hello extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name
        };
        this.handleChnage = this.handleChange.bind(this);
        console.log(this.props);
    }
    handleChange(e) {
        this.setState({
            name: e.target.value
        });
    }
    render() {
        return(
            console.log("kalallaal")
        );
    }
}

<input onChange={this.handleChange}/>;
