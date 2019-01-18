// presentatonal component

import React from 'react';

export default function ProfilePic(props) { // props is how i receive this.state I passed in app.js
    return(
        <div>

            <h1 className="welcome-statement">The Hang, your only fashion social network. Welcome, {props.first}</h1>
            <img onClick = { props.showUploader } className="pic" src= {props.profilePicUrl}/>

        </div>
    );
}

//its apps job to determine the uploader should be on the screen
// when user clicks on the picture
// ptofilepic needs to tell it to app
// and that will show
// can't directly affect state of app
// it can only send a message to app to say to show uploader
