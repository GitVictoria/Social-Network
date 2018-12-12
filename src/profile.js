import React from 'react';
import Bio from './bio';


export default function Profile(props) {
    console.log("props in profile.js: ", props);
    return (
        <div className="profile-container">
            <div className="profile-name">
                {props.first } { props.last} {props.email} 
            </div>

            <img className="profile-pic" src= {props.profilePicUrl}/>
            <div className="bio">
                <h1>What best describes you?</h1>
                <div>
                    <Bio bio={props.bio} setBio={props.setBio}/>
                </div>
            </div>
        </div>
    );
}
