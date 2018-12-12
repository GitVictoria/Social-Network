import React from 'react';
import { connect } from 'react-redux';
import { initSocket } from './socket';

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.sendMessage = this.sendMessage.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);

    }

    sendMessage(e) {
        let socket = initSocket();
        if (e.which === 13) {
            console.log(e.target.value);
            socket.emit('chatMessage', e.target.value);
            e.target.value = null;

        }
    }

    componentDidMount() {
        //  display the last 10 messages HOW?
        this.elem;


    }

    componentDidUpdate() {
        // runs everytime there has been a change in chat component
        // this.elem is the div that is rendered
        console.log("this elem: ", this.elem);
        if (!this.elem) {
            return;
        }
        this.elem.scrollTop  = this.elem.scrollHeight;
    }

    render() {
        if (!this.props.message) {
            return null;
        }

        return (
            <div className='chat-component'>
                <h1>CHAT</h1>
                <div id="chat-messages" ref={elem => (this.elem = elem)}>
                    <h1>MESSAGES</h1>
                    {this.props.message.map(message => {
                        var url;
                        if (message.profilepic) {
                            url = message.profilepic;

                        } else {
                            url = '/Hanger.jpg';
                        }

                        return (
                            <div key = { message.id}>
                                <div className='message-container'>
                                    <img className="chat-users" src={url} alt="online user"/>
                                    <div>
                                        <p> {message.first} Says:</p>
                                        <p>{message.message}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                    }
                </div>
                <div>
                    <center>
                        <textarea className="chat-box" onKeyDown={this.sendMessage} placeholder="Press Enter To Submit The Message"/>
                    </center>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    var list = state.message;
    return {
        message: list
    };
};

export default connect(mapStateToProps)(Chat);

// if (!this.props.animals) {
//     return null;
// }
// console.log('this props animals', this.props.animals); // these animals comes from mapStateToProps function
// // store result of map in variable
// // map doesn't modify the array it's looping through, instead it return a new array
// let arrOfCuteAnimals = this.props.animals.map(elem => {
//     console.log("elem: ", elem) ; // elem.animal will just give me animal names
//     // key => must be different everytime it itterates
//     return (
//         <div key = {elem.id}>
//             <p> {elem. animal } </p>
//         </div>
//     );
//
//
// });
