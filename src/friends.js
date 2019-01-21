import React from 'react';
import axios from './axios';
import { connect } from'react-redux';
import { friendsAndWannabes } from './action';
import { unfriend } from './action';
import { acceptFriendRequest } from './action';
import Back from './goBack';

class Friends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrowVisible: false
        };
    }

    componentDidMount() {
        this.props.dispatch(friendsAndWannabes()); // receive a list of friends and wannabes
        this.setState({
            arrowVisible:true
        });


    }

    render() {
        if (!this.props.friends) {
            return null;
        }
        return (
            <div>
                {this.state.arrowVisible && <Back/>}
                <div className='friends-container'>
                    <center>
                        <h1>FRIENDS</h1>
                    </center>
                    {this.props.friends.map(friend => {
                        var url;
                        if (friend.profilepic) {
                            url = friend.profilepic;
                        } else {
                            url = "/Hanger.jpg";
                        }

                        return (
                            <div key = {friend.id}>
                                <div className='friend'>

                                    <img  className='friendpic' src= {url} alt=""/>
                                    <div className='friend-name'>
                                        {friend.first} {friend.last}
                                    </div>
                                    <button className='button' onClick = {e=>this.props.dispatch(unfriend(friend.id))}>unfriend</button>
                                </div>
                            </div>
                        );
                    })
                    }
                    <center>
                        <h1>AWAITING RESPONSE</h1>
                    </center>
                    {this.props.wannabes.map(friend => {
                        var url;
                        if (friend.profilepic) {
                            url = friend.profilepic;
                        } else {
                            url = "/Hanger.jpg";
                        }

                        return (
                            <div key = {friend.id}>
                                <div className='awaiting-friend'>
                                    <img className='friendpic' src={url} alt=""/>
                                    <div className='awaiting-friend-name'>
                                        {friend.first} {friend.last}
                                    </div>
                                    <button className='button' onClick = {e=>this.props.dispatch(acceptFriendRequest(friend.id))}>accept friendrequest</button>
                                </div>
                            </div>
                        );
                    })
                    }
                </div>
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
