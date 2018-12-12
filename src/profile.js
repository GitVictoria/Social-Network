import React from 'react';
import Bio from './bio';
import { Link } from 'react-router-dom';



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
                <div className='description'>
                    <Bio bio={props.bio} setBio={props.setBio}/>
                </div>

            </div>
            <div className='nav-container'>
                <h1>What are we up tp today?</h1>
                <div className='nav-button-container'>
                    <div>
                        <button className="redirect-page"><Link to = '/friends'>FRIENDS</Link></button>
                    </div>
                    <div>
                        <button className="redirect-page"><Link to = '/chat'>HANG IN CHAT</Link></button>
                    </div>

                    <div>
                        <button className="redirect-page"><Link to = '/online'>WHO IS ONLINE</Link></button>
                    </div>
                    <div>
                        <button className="redirect-page"><Link to = '/user/'>USERS</Link></button>
                    </div>
                </div>
            </div>
        </div>
    );
}
