import { initSocket } from './socket';
import React from 'react';
import { connect } from'react-redux';
import {usersOnline} from './action';



class Onlineusers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // componentDidMount() {
    //     // LOADS ONLINE USERS
    // }

    render() {
        if (!this.props.users) {
            return null;
        }
        console.log("this.props in online users RENDER ", this.props);
        return (
            <div>
                <h1>PEOPLE WHO ARE CURRENTLY ONLINE</h1>
                {this.props.users.map(users => {
                    var url;
                    if (users.profilepic) {
                        url = users.profilepic;
                    } else {
                        url = '/Hanger.jpg';
                    }

                    return (
                        <div key = {users.id}>
                            <img className="online-users" src={url} alt="online user"/>
                            {users.first} {users.last}
                        </div>
                    );
                })
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    var list = state.users;
    return {
        users: list
    };
};
export default connect(mapStateToProps)(Onlineusers);
