import React from 'react';
import Bio from './bio';


export default function Profile(props) {
    console.log("props in profile.js: ", props);
    return (
        <div>
            <img className="profile-pic" src= {props.profilePicUrl}/>
            {props.first } { props.last}
            <Bio bio={props.bio} setBio={props.setBio}/>

        </div>
    );
}// bio={props.bio} setBio{props.setBio}
