import { initSocket } from './socket';
import axios from './axios';


export async function userJustLeft(userWhoLeft) {
    return {
        type: 'USER_LEFT',
        users: userWhoLeft
    };
}

export async function newOnlineUser(userJustJoined) {
    return {
        type: 'USER_JOINED',
        users: userJustJoined
    };
}

// what comes to function is results.rows
export async function usersOnline(listOfUsersOnline) {
    // const { data } = await axios.get('/onlineUsers');
    return {
        type: 'USERS_ONLINE',
        users: listOfUsersOnline
    };
}

export async function receiveUsers() {
    const { data } = await axios.get('/users');
    return {
        type: 'RECEIVE_USERS',
        users: data.users
    };
}

export async function friendsAndWannabes() {
    const { data } = await
    axios.get('/friendslist');
    return {
        type: "RECEIVE_FRIENDS_AND_WANNABES",
        friends: data
    };

}

export function unfriend(otherPersonId){
    return axios.post("/friendship/"+ otherPersonId + "/cancel").then(result=>{
        console.log("results in unfriend: ", result);
        return {
            type: 'UNFRIEND',
            id: otherPersonId
        };
    });

}
export function acceptFriendRequest(otherPersonId){
    return axios.post("/friendship/" + otherPersonId + "/accept").then(result=>{
        console.log("results in acceptFriendRequest: ", result);
        return {
            type: "ACCEPT_FRIEND_REQUEST",
            id: otherPersonId
        };
    }).catch(err => {
        console.log(err);
    });

}
