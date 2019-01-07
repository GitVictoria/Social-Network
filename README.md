# Social-Network
MVP for social network platform with registration, log-in, live chat, friends, and online users

The idea of the project is to create a working version of social network platform with most relevant features in order to 
learn Socket.io and Redux tools.


Project was developed in Javascript using:
* Socket.io
* Redux
* Node.js
* React
* PostgreSQL 11
* Bcrypt
* Amazon s3 


## Live Chat-room 

Chatroom function was developed using socket.io and redux allowing users for instant group messaging. 

Clients emit a `'chatMessage'` event that has a textual message in its payload. When the server receives this event, 
it broadcasts a `'chatMessage'` event to all of the connected sockets. The payload for this event includes
the message the user sent as well as the user's id, first name, last name, and profile pic. The server
stores the message in an array. 

DEMO TO FOLLOW 


## Online Users

Feature option to allow users to see all of the users that are currently online

Every time a logged in user makes a request, an object representing that user is pushed to an array after 
confirming that that user is not already in the list. Using socket.io, `'disconnect'`  event allows to remove the user from the 
active online user list upon close of browser. Using socket id in addition to user id to determine the list of active 
online users. 




DEMO TO FOLLOW 




In client code, we are listening for the `'onlineUsers'`, `'userJoined'`, and `'userLeft'` events and handle 
them by dispatching corresponding actions.  


## Additional Features

A fundamental social network feature is to allow the users to have a 'friends' feature. Users are able to send, receive, accept and 
decline friend requests. All of the functions are caused by dispatching an action. All of these require server requests to be made,
so the action creators return promises that resolve with actions.



___

Each user is allowed to add and edit a bio, as well as uploading or changing existing profile picture. Bio as a separate 
component stores the information in the database matching the user id to cookie session id. User is able to add a profile photo
using the Uploader component, that is set to `'visible'` in the state upon click on the top right hand corner. The data 
is stored using Amazon s3. 


___


In addition to the above, I decided to build a function to allow the user to have an overview of other users profiles 
with navigation based on one page only. 
