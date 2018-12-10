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
            friends: "FILTER OUT THE ID THAT WAS RETURNED"
        });
    } else if (action.type == 'ACCEPT_FRIEND_REQUEST') {
        state = Object.assign({}, state, {
            friends: "MAP"
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
            users: [...state].filter(action.users)
        };
    }

    // ----------- CHECK SYNTAX ----------- //


    return state;
}
