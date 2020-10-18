import React, { Component } from 'react';
import axios from "axios";
import Nav from './navbar';

class Login extends Component {
    state = {}

    redirect = redirectUrl => {
        window.location = redirectUrl;
    };

    handleSubmit = event => {
        event.preventDefault();
        const data = new FormData(event.target);

        const loginurl = this.props.server_url + 'login';

        console.log(loginurl);

        axios.post(loginurl, data)
        .then(response=>{
            console.log(response);
            if( response['data']['credential'] === 200 ){
                console.log('correct password');
                this.props.handleValidCredential(response['data']['user']);
                //this.redirect('/newsfeed');
            }
        })
        .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="container">
                
                <h3>First put your Email and Password</h3>
                <form onSubmit={ this.handleSubmit }>
                    Email:
                    <input type="email" name="email" /><br/>
                    Password:
                    <input type="password" name="password" /><br/>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}
 
export default Login;