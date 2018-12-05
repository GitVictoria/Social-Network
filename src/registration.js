// class component because it needs to have state
//  because it needs 'data' (in Vue) to hold information

import React from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';
// link will be the JSX tag to link to other component




// means that 'Regsitration' is a child of some bigger component

const formValid = error => {
    let valid = true;

    Object.values(error).forEach(val => {
        val.length == 0 && (valid=false); //shorter way of doing an IF statement here
    });
    return valid;
};

export default class Registration extends React.Component {
    constructor(props) {
        super(props);


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            // error: '',
            first: '',
            last: '',
            password: '',
            email: '',
            error: {
                first: '',
                last: '',
                password: '',
                email: '',
                error: ''

            }
        };

    }




    handleChange(e) { // e gives me access to event object
        // e.target.value is the user input
        // in setState have to use [] because of dots in syntax
        console.log("name of input: ", e.target.name);

        this.setState({
            [e.target.name]: e.target.value


        }, () => console.log('this state in handle change: ', this.state));
        // .catch(err => {
        //     console.log(err);
        // });
        //set state is asynchronous
        // use callback function to console log
    }

    // function validate(this.state) {


    // we have to tell react to records user input (unlike Vue))
    // we can do that with event listener on every single input
    // onChange Enent Listener ! Followed by handleChnage function
    // this function would be written right before render
    // we capture input with e.target.value, now we need to store it
    // setState is to store the change

    handleSubmit(e) {
        e.preventDefault();

        let error = this.state.error;

        // console.log(e.target.name);

        // if statements
        /// wisth this.state.first

        if (this.state.first.length < 2) {
            this.setState({
                error: {
                    first: "Your name should consist of 2 characters or more"
                }

            });
            return;
        }
        if (this.state.last.length < 2) {
            this.setState({
                error: {
                    last: "Your last name should consist of 2 characters or more"
                }

            });
            return;
        }
        if (this.state.password.length < 8) {
            this.setState({
                error: {
                    password: "Your password should consist of 8 characters or more"
                }

            });
            return;
        }
        if (this.state.email.length < 5) {
            this.setState({
                error: {
                    email: "Please enter a valid email address"
                }

            });
            return;
        }

        // switch (e.target.name) {
        //                 case 'first':
        //                     error.first = e.target.value.length < 2 && e.target.value.length > 0 ?
        //                         this.setState({
        //                             error: {
        //                                 first: "Your name should consist of 2 characters or more"
        //                             }
        //                         })
        //                         : "";
        //
        //
        //                     break;
        //                 case 'last':
        //                     error.last = e.target.value.length < 2 && e.target.value.length > 0
        //                         ? "Your last name must contain more that 2 caracters"
        //                         : "";
        //                     break;
        //                 case 'password':
        //                     error.password = e.target.value.length < 2 && e.target.value.length > 0
        //                         ? "Your password name must contain more that 2 caracters"
        //                         : "";
        //                     break;
        //                 case 'email':
        //                     error.email = e.target.value.length < 2 && e.target.value.length > 0
        //                         ? "Your email must contain more that 2 caracters"
        //                         : "";
        //                     break;
        //                 default:
        //                     break;
        // }



        // ------ ERROR HANDLING ------ //
        // const error = validate(this.state);
        // const isEnabled =
        //  first.length > 0 &&
        //  last.length > 0 &&
        //  password.length > 0 &&
        //  email.legth > 0;

        // ---------- VALIDATOR -------------//
        if (formValid(this.state.error)) {
            console.log("SUBMITTING:",
                `"FirstName: ", ${this.state.first}
            "LastName: ", ${this.state.last}
            "password: ", ${this.state.password}
            "Email: ", ${this.state.email}`);
        }
        // ---------- VALIDATOR -------------//

        axios.post('/registration', this.state).then(resp => {
            console.log(resp);
            if (resp.data.showErr == true) {

                this.setState({
                    error: {
                        error: "something went wrong, please try again!"
                    }
                });
                return;
            } console.log(this.state.error);
            // } if (this.state.error)
            console.log("resp in then of POST /registration", resp);
            location.replace('/');
        });
    }

    render() {
        return (
            // all of our JSX - what shouls appear on the screen
            <div className="registration-container">
                <center>
                    <h1>Please Register</h1>
                    <form onSubmit = {this.handleSubmit}>
                        <div><input onChange = {this.handleChange} name="first" type="text" placeholder="First Name" />
                            <p className="error-message">{this.state.error.first}</p>
                        </div>

                        <div><input onChange = {this.handleChange} name="last" type="text" placeholder="Last Name"/>
                            <p className="error-message">{this.state.error.last}</p>
                        </div>

                        <div><input onChange = {this.handleChange} name="password" type="password" placeholder="Password" />
                            <p className="error-message">{this.state.error.password}</p>
                        </div>
                        <div><input onChange = {this.handleChange} name="email" type="text" placeholder="Email Address" />
                            <p className="error-message">{this.state.error.email}</p>
                        </div>
                        <div className="register-button"><button className="register-button">Register</button>

                        </div>
                        <button className="login-button"><Link to = '/login'>Click here to Log in</Link></button>
                    </form>
                </center>
                <center>
                    <div className="reg-error" >
                        <h1>{this.state.error.error}</h1>
                    </div>
                </center>
            </div>
        );
    }
}
