import React from 'react';
import axios from './axios';

export default class Bio extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bioVisible: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.editBio = this.editBio.bind(this);
        this.exitBio = this.exitBio.bind(this);

    }

    exitBio() {
        console.log("exit bio in action");
        this.setState({
            bioVisible: false
        });
    }

    handleChange(e) {
        this.setState({
            [e.target.name ]: e.target.value
        });

    }

    handleSubmit(e) {
        e.preventDefault();
        const self = this;
        console.log(this.state);

        axios.post('/bio', this.state).then(resp => {
            console.log("resp.data.rows[0].bio: ", resp.data.rows[0].bio);
            self.props.setBio(resp.data.rows[0].bio);
            this.setState({
                bioVisible: false
            });
        }).catch(err => {
            console.log(err);
        });
    }

    editBio(e){
        e.preventDefault();
        this.setState({
            bioVisible: true
        });


    }

    render() {
        return(
            <div>
                { this.props.bio &&
            <div>
                <center>
                    <h2>{this.props.bio}</h2>
                    <button className="edit-button"onClick={this.editBio} >Edit</button>
                </center>
            </div>
                }

                {!this.props.bio &&
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>Please enter your BIO bellow</h2>

                    <input name='bio' type='text' placeholder='How Would You Describe Yourself?'  className="bio-input" onChange={this.handleChange} autoComplete="off"/>
                    <button className="submit-button" onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>

                }

                {this.state.bioVisible &&
                <div className="bio-inpout-container">
                    <h1 className="exit-button" onClick={this.exitBio}>X</h1>
                    <form onSubmit={this.handleSubmit}>
                        <h3>Tell us something about yourself...</h3>

                        <input name='bio' type='text' placeholder='Edit Your Description Here'  className="bio-input" onChange={this.handleChange} autoComplete="off"/>
                        <button className="submit-button" onClick={this.handleSubmit}>Submit</button>
                    </form>
                </div>
                }
            </div>
        );
    }
}


//         if (this.props.bio) {
//             return (
//                 );
//         } else  {
//             return (
//
//                     </form>
//                     <button onClick="editBio" >Add Bio</button>
//                 </div>
//             );
//         }
//
//         if (this.state.bioVisible) {
//             return (
//                 <div>
//                     <form onSubmit={this.handleSubmit}>
//                         <h2>Please enter your BIO bellow</h2>
//
//                         <input name='bio' type='text' placeholder='You BIO goes here'  className="bio-input" onChange={this.handleChange}/>
//                         <button onClick='handleSubmit'>Submit</button>
//
//                     </form>
//                     <button onClick="editBio" >Add Bio</button>
//                 </div>
//             );
//         }
//
//     }                 //  defaultValue={this.state.bio}
// } //            <textarea defaultValue={this.state.bio} onChnage={this.handleChange}/>
