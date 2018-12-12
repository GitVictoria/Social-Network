import React from 'react';
import { Link } from 'react-router-dom';
import FriendButton from './friendbutton';
import axios from './axios';
import Users from './users';


export default class OtherPersonProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

        let id = this.props.id;
        if (!id) {
            id = this.props.match.params.id;
        }
        console.log("component did mount ");
        axios
            .get("/user/" + id + "/info")
            .then(result => {
                console.log("results in OPP: ", result.data.rows[0]);
                this.setState(result.data.rows[0]);
            })
            .then(() => {
                console.log("this.state", this.state);
            })
            .catch(err => {
                console.log("error in other person profile: ", err);
                this.props.history.push("/");
            });
    }


    render() {
        return (
            <div className="opp-container">
                <h5>The user id {this.state.id} profile</h5>
                <h2> {this.state.first} {this.state.last}</h2>
                <img className="profile-pic" src={this.state.profilepic}/>
                <h4>Get to know a little about {this.state.first}!</h4>
                <h2>{this.state.bio}</h2>
                <FriendButton otherUserId = {this.props.match.params.id}/>

            </div>
        );
    }
}

// ;

//

// links to other ppls profile
// this.props.match.params.id id of the person whos profile youre looking at
// passing id and when it mounts it should make ajax REQUEST//route should return accepted boolean
// and either the sender or receiver id
// when comp mounts it get the resp and sets state property in button text
// and button send a request according to the text thats on the button
// totl 5 server routes
// select  when comp mounts
// SUBMIT accepted
// INSERT
// UPDATE
// DELETE
// all of the routes needs to be passed the user id on whos page were on
// when yuo get success frorm ajax, update state accordingly
// friend button only has one prop - user id
// it will have to pass req.params
// component did mount will do a select request
//
