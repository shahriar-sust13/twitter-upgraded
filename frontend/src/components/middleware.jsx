import React, { Component } from 'react';
import Newsfeed from './newsfeed';
import Login from './login';
import Users from './users';

class Middleware extends Component {
    state = { 
        authenticated: 0,
        user: 0
    }

    handleValidCredential = data => {
        this.setState({
            authenticated: 1,
            user: data
        });
    }

    renderNewsfeed() {
        if( this.state.authenticated === 0 ){
            return <Login server_url={this.props.server_url} handleValidCredential = {this.handleValidCredential}/>
        }
        if( this.props.users === true ){
            return <Users server_url={this.props.server_url} visitor_id={this.state.user['id']} />
        }
        return <Newsfeed server_url={this.props.server_url} user={this.state.user} />
    }

    render() {
        return ( 
            <div>
                { this.renderNewsfeed() }
            </div>
        );
    }
}
 
export default Middleware;