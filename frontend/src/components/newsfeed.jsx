import React, { Component } from 'react';
import Tweets from './tweets';
import axis from 'axios';
import Nav from './navbar';

class Newsfeed extends Component {
    state = {  }

    constructor(){
        super();
    }

    redirect = redirectUrl => {
        window.location = redirectUrl;
    };

    componentDidMount(){
        /*
        const authUrl = this.props.server_url + 'islogged';
        axis.get(authUrl)
        .then(response => {
            console.log(response['data']);
            if( response['data']['logged'] === false ){
                this.redirect('/login');
            }
            this.setState({user: response['data']});
            //this.setState({tweets: response['data']});
        });
        */
    }

    /*
    renderNewsfeed(){
        if( 'user' in this.state ){
            return <Tweets user={this.props.user} server_url = {this.props.server_url} />
        }
    }
    */

    render() {
        return (
            <div className='container'>
                <Nav logged={true} />
                <Tweets user={this.props.user} server_url={this.props.server_url} />
            </div>
        );
    }
}
 
export default Newsfeed;