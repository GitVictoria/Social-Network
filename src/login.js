import React from 'react';
import axios from './axios';

// check hash routing in Vue
export default class Login extends React.Component {
    constructor() {
        super();


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


        this.state = {
            error: ''
        };
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value // field name: user input
        }, () => console.log("handleChange of login is registering: ", this.state));
    }

    handleSubmit(e) {
        e.preventDefault();
        axios.post('/login', this.state).then(resp => {

            console.log("Resp in axios login post req: ", resp);
            if (resp.data.showErr == true) {
                this.setState({
                    error: "something went wrong, please try again!"
                });
                // });
            } else {
                location.replace('/main');
            }
        });
    }








    render() {
        return (
            <div>
                <center>
                    <h1>Please Log In To Continue</h1>
                    <form onSubmit= {this.handleSubmit}>
                        <div className="loginTabs">
                            <input onChange = {this.handleChange} type="text" name="email" placeholder="Email Address"/>
                        </div>
                        <div className="loginTabs">
                            <input onChange = {this.handleChange} type="password" name="password" placeholder="Password"/>
                        </div>
                        <div className="loginTabs">
                            <button name="button">Submit</button>
                        </div>
                    </form>
                </center>
                <center>
                    <div className="reg-error">
                        <h1>{this.state.error.error}</h1>
                    </div>
                </center>
            </div>

        );
    }

}
