import React from "react";
import axios from "./axios";

export default class FriendButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.makeFriendRequest = this.makeFriendRequest.bind(this);
        this.cancelFriendrequest = this.cancelFriendrequest.bind(this);
    }
    componentDidMount() {
        axios.get("/friendship/" + this.props.otherUserId).then(results => {
            console.log("results in axios friendship: ", results);
            if (results.data == "") {
                this.setState({ buttontext: "send friendrequest", status: 0 });
            }
            if (
                results.data.accepted == false &&
                results.data.receiver_id == this.props.otherUserId
            ) {
                this.setState({
                    buttontext: "cancel friendrequest",
                    status: 1
                });
            }
            if (
                results.data.accepted == false &&
                results.data.sender_id == this.props.otherUserId
            ) {
                this.setState({
                    buttontext: "accept friendrequest",
                    status: 2
                });
            }
            if (results.data.accepted == true) {
                this.setState({
                    buttontext: "unfriend",
                    status: 3
                });
            }
        });
    }

    makeFriendRequest() {
        console.log(this.props);
        if (this.state.status == 0) {
            axios
                .post("/friendship/" + this.props.otherUserId + "/send")
                .then(results => {
                    this.setState({
                        buttontext: "cancel friendrequest",
                        status: 1
                    });
                    console.log("result in send", results);
                });
        }
        if (this.state.status == 1 || this.state.status == 3) {
            axios
                .post("/friendship/" + this.props.otherUserId + "/cancel")
                .then(results => {
                    console.log("results in friendship cancel: ", results);
                    this.setState({
                        buttontext: "send friendrequest",
                        status: 0
                    });
                });
        }
        if (this.state.status == 2) {
            axios
                .post("/friendship/" + this.props.otherUserId + "/accept")
                .then(results => {
                    console.log("results in friendship accept: ", results);
                    this.setState({
                        buttontext: "unfriend",
                        status: 3
                    });
                });
        }
    }
    cancelFriendrequest() {
        axios
            .post("/friendship/" + this.props.otherUserId + "/cancel")
            .then(results => {
                console.log("results in friendship cancel: ", results);
                this.setState({
                    buttontext: "send friendrequest",
                    status: 0
                });
            });
    }
    render() {
        return (
            <div>
                <button className="button" onClick={this.makeFriendRequest}>
                    {this.state.buttontext}
                </button>
                {this.state.status == 2 && (
                    <button onClick={this.cancelFriendrequest}>decline</button>
                )}
            </div>
        );
    }
}

{
    /* <FriendButton otherUserId={this.props.match.params.id} />; */
}
