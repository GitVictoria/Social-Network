import React from 'react';
import axios from './axios';

export default class Uploader extends React.Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        console.log("handleChange is running", e.target.files[0]);
        console.log("e.target.name: ", e.target.name);
        this.setState({
            [e.target.name ] : e.target.files[0] // name: filename
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        var formData = new FormData();

        formData.append("file", this.state.file); // takes two arguments 1. key 2. value

        axios.post('/upload', formData).then(resp => {
            console.log("RESP in Upload: ", resp);
        }).catch(err => {
            console.log(err);
        });

        // VUE IMAGE  UPLOAD
        // formData stuff
        // POST request to server
        // then then of axios.post('/upload') will run
        // when the image is in upoads, amazon, database
        // we have to figure out how to close component
        // the new image should show instantly
        // go to app and get it to make chnages
        // var the change = "profilePicUrl", uploaderIsVisible
        // 1. GET USER
        // 2. POST UPLOAD
        // 3. CLOSE UPLOADER
        // SHOW DEFAULT IMAGE
    }

    render() {
        return (
            <div className="uploader">
                <h1>Upload an image</h1>
                <form onSubmit = {this.handleSubmit}>
                    <input name = 'file' onChange={ this.handleChange } type = "file" accept = "image/*"/>
                    <button>upload</button>
                </form>
            </div>

        );
    }
}
