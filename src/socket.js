// client side socket
import * as io from 'socket.io-client';
import {usersOnline} from './action';
import { newOnlineUser } from './action';
import { userJustLeft } from './action';
import { listNewMessages} from './action';
import { addNewMessage} from './action';


let socket;

// bellow ensures that only one socket is open per user
// eg user opens up same website in multiple tabs
export function initSocket(store) {
    if(!socket) {
        socket = io.connect();

        // most of our socket code goes here

        socket.on('newMessage', addMessage => {
            console.log("message in client side socket, new message: ", addMessage);
            store.dispatch(addNewMessage(addMessage));
        });

        socket.on('messages', listMessages => {
            console.log("message in client side socket, online messages: ", listMessages);
            store.dispatch(listNewMessages(listMessages));

        });

        // on() accepts 2 arguments
        // 1. message name -> that I passed in server
        // 2. callback -> will run as soon as the client hears the 'catnip' event
        // message value will be watever came after comma in socket.emit
        socket.on('onlineUsers', listOfUsersOnline => {
            console.log("message in client side socket, onoine users: ", listOfUsersOnline);
            store.dispatch(usersOnline(listOfUsersOnline));
            //pass action creator
            // need to put this into redux
        });

        socket.on('userJoined', userJustJoined => {
            console.log("message in client side socket, users that just joined: ", userJustJoined );
            store.dispatch(newOnlineUser(userJustJoined));
        });

        //userJoined we need to inform everyone except person who just connected
        // before i fire event i need to make sure socket id is unique


        socket.on('userLeft', userWhoLeft => {
            console.log("message in client side socket, users that just left: ", userWhoLeft );

            store.dispatch(userJustLeft(userWhoLeft));
        });

        // ------- CLASS EXAMPLE ------------ //

        // socket.on('cuteAnimals', data => {
        //     console.log('data: ', data);
        //
        //     store.dispatch(addAnimals(data))
        // }

        // ------- CLASS EXAMPLE ------------ //

    }


    return socket;
}
