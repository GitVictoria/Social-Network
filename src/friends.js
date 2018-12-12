import React from 'react';
import axios from './axios';
import { connect } from'react-redux';
import { friendsAndWannabes } from './action';
import { unfriend } from './action';
import { acceptFriendRequest } from './action';

class Friends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        this.props.dispatch(friendsAndWannabes());

        // receive a list of friends and wannabes
    }

    render() {
        if (!this.props.friends) {
            return null;
        }
        return (
            <div>
                <h1>FRIENDS</h1>
                {this.props.friends.map(friend => {
                    var url;
                    if (friend.profilepic) {
                        url = friend.profilepic;
                    } else {
                        url = "/Hanger.jpg";
                    }

                    return (
                        <div key = {friend.id}>
                            <img  className='friendpic' src= {url} alt=""/>
                            <button onClick = {e=>this.props.dispatch(unfriend(friend.id))}>unfriend</button>
                            {friend.first} {friend.last}
                        </div>
                    );
                })
                }
                <h1>PEOPLE WHO WANT TO BE YOUR FRIENDS</h1>
                {this.props.wannabes.map(friend => {
                    var url;
                    if (friend.profilepic) {
                        url = friend.profilepic;
                    } else {
                        url = "/Hanger.jpg";
                    }

                    return (
                        <div key = {friend.id}>
                            <img className='friendpic' src={url} alt=""/>
                            <button onClick = {e=>this.props.dispatch(acceptFriendRequest(friend.id))}>accept friendrequest</button>

                            {friend.first} {friend.last}
                        </div>
                    );
                })
                }
            </div>
        );
    }
}

const mapStateToProps = state => {

    var list = state.friends;
    return {
        friends: list
         && list.filter(
             user=>user.accepted == true
         ),
        wannabes: list && list.filter(
            user=>!user.accepted
        )
    };
};

export default connect(mapStateToProps)(Friends);
