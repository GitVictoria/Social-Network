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
            <div className='online-users-container'>
                <center>
                    <h1>Who is hanging online right now?</h1>
                </center>
                {this.props.users.map(users => {
                    var url;
                    if (users.profilepic) {
                        url = users.profilepic;
                    } else {
                        url = '/Hanger.jpg';
                    }

                    return (
                        <div key = {users.id}>
                            <div className='online-user-container'>
                                <img className="online-users" src={url} alt="online user"/>
                                <div className='online-names'>
                                    {users.first} {users.last}

                                </div>
                            </div>
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
