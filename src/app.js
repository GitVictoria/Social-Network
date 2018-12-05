import React from 'react';
import axios from './axios';
import Logo from './main';
import ProfilePic from './profilepic';
import Uploader from './uploader';
import {BrowserRouter, Route} from 'react-router-dom';
import Logout from './logout';
import Profile from './profile';
import OtherPersonProfile from './otherpersonprofile';

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false,
            bioVisible: false

        };
        this.showUploader = this.showUploader.bind(this);
        this.setBio = this.setBio.bind(this);
    }

    showUploader() {
        this.setState({
            uploaderIsVisible: true
        }, () => console.log("this.state in showUploader: ", this.state));
    }

    // componenet didmount function is a lifecycle component
    // runs as soon as render happens

    componentDidMount() {
        axios.get('/user').then(({ data }) => {
            console.log("response /user data: ", data);
            this.setState(data.rows[0]);
            console.log("this state in componentmount", this.state);
        });
    }

    setBio(bio) {
        this.setState({
            bio: bio
        });
    }
    // componentDidMount() {
    //     axios.get('/user').then(({data}) => { //de constructing = resp.data
    //         console.log('resp in /get USER: ', data);
    //         // the resp has to go in the state
    //         this.setState(data);// now this holds info about the user
    //         // i need to pass this state from app to profile pic
    //         // first = { this.state.first }
    //         // left is my name - right is the state of component im in
    //     });
    // }


    render() {
        return (
            <div>
                <Logout/>
                <Logo/>

                <ProfilePic
                    first = { this.state.first }
                    profilePicUrl = { this.state.profilepic }
                    showUploader = {this.showUploader}
                />
                {this.state.uploaderIsVisible && <Uploader/>}
                <h1>Welcome to the Hang</h1>
                <BrowserRouter>
                    <div>
                        < Route exact path='/' render= { () => {
                            return <Profile
                                id={this.state.id}
                                first={this.state.first}
                                last={this.state.last}
                                profilePicUrl={this.state.profilepic}
                                bio={this.state.bio}
                                setBio={this.setBio}
                                showUploader={this.showUploader}
                            />;
                        }}/>
                        < Route exact path='/user/:id' render= { (props) => {
                            return <OtherPersonProfile {...props}
                                key = { props.match.url }/>;
                        }} />

                    </div>
                </BrowserRouter>
            </div>



        );
    }// if the left is true, then render the right
}

// render function in the router does not automatically pass props to the component its rendering
// <Route path = "///" componeent  = {COMPOENENT }/> this way all the props are passed
// above syntax works without links to other peoples profiles.

//PART 5
// GET USER with dynamic ID from data base
// axios will be in componentdidmount function
// once OOP has all the data
// we want to put the data into otherpersons profile
// render setInterval(function () {
// in case of nonsense ur;, redirect to / route
// this.props.history.push('/')
// history.push is redirect
// should be able to go to /user/myown profile
//  redirect to ('/')
// <Route path='/main/user/:id' render = { props => {
//     return <OtherPersonProfile { ...props}
//         key = { props.match.url }/>;
// }}/>


// PART 6
// button can do 4 different things
// click friend request ->
// add, accept, cancel, end
// info that needs to be stored:
// - > who are the two users involved -> create a new table
// - >
