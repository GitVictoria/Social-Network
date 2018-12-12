
import React from 'react';
import FriendButton from './friendbutton';
import OtherPersonProfile from './otherpersonprofile';
import axios from './axios';
import { Link } from 'react-router-dom';
import {BrowserRouter, Route} from 'react-router-dom';



export default class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            otherPersonId: ''
        };

        this.showPerson = this.showPerson.bind(this);
    }

    showPerson(e){
        // e.preventDefault();
        console.log("show person running HUREY, user.id?", this.state.user);
    }

    componentDidMount() {
        axios.get('/usersss').then(({ data }) => {
            console.log("response in /usersss data: ", data );
            this.setState ({
                user: data
            });
            console.log("this state in componentmount", this.state);
        }).catch(err => {
            console.log(err);
        });
    }

    render() {



        return(

            <div>

                <div className='user-list'>
                    <h1>List of users</h1>
                    {this.state.user && this.state.user.map(
                        user => (

                            <div key = {user.id}>

                                <button className='list-of-users'><Link className='link' to = {"/users/" + user.id}>{user.first}    {user.last}</Link></button>

                            </div>
                        )
                    )}
                </div>

                <div className='other-person'>
                    <div className='rendered-user'>
                        < Route exact path='/users/:id' render= { (props) => {
                            return <OtherPersonProfile {...props}
                                key = { props.match.url }/>;
                        }} />
                    </div>
                </div>

            </div>
        );
    }
}
//                                 <button onClick= {e => this.showPerson(user.id)} className='list-of-users'>{user.first}  {user.last}</button>

// <Link to = "/user/" + `${user.id}` >{user.first} {user.last}</Link>
