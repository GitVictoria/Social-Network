//
// export default function(state = {}, action) {
//     if (action.type == 'RECEIVE_USERS') {
//         state = Object.assign({}, state, {
//             users: action.users
//         });
//     }
//     return state;
// }

// return {
//     ...state,
//     friends: state.friends.map(
//         f => {
//             if (f.id == action.id) {
//                 return {
//                     ...f,
//                     accepted: true
//                 }
//             } else {
//                 return f;
//             }
//         }
//     )
// }



export default function(state = {}, action) {
    if (action.type == 'RECEIVE_FRIENDS_AND_WANNABES') {
        state = Object.assign({}, state, {
            friends: action.friends
        });
    } else if (action.type == 'UNFRIEND') {
        state = Object.assign({}, state, {
            friends: state.friends.filter(
                f => {
                    if(f.id != action.id){
                        return f;
                    }

                }
            )
        });
    } else if (action.type == 'ACCEPT_FRIEND_REQUEST') {
        state = Object.assign({}, state, {
            friends: state.friends.map(
                f => {
                    if (f.id == action.id) {
                        return {
                            ...f,
                            accepted: true
                        };
                    } else {
                        return f;
                    }
                }
            )
        });
    }

    // ----------- CHECK SYNTAX  ----------- //

    else if (action.type == 'USERS_ONLINE') {
        return {
            ...state,
            users: action.users
        };
    } else if (action.type == 'USER_JOINED') {
        return {
            ...state,
            users: [...state.users, action.users]
        };
    } else if (action.type == 'USER_LEFT') {
        return {
            ...state,
            users: state.users.filter(
                user => {
                    if (user.id != action.users) {
                        return user;
                    }
                }
            )
        };
    } else if (action.type == 'DISPLAY_MESSAGES') {
        return {
            ...state,
            message: action.message
        };
    } else if (action.type == 'ADD_NEW_MESSAGE') {
        console.log("action in add message reducer :  ", action.message);
        return {
            ...state,
            message: action.message
        };
    }

    // ----------- CHECK SYNTAX ----------- //


    return state;
}
