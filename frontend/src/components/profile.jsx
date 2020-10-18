import React, { Component } from 'react';
import axis from 'axios';
import Tweet from './tweet';
import Nav from './navbar';
import Login from './login';

class Profile extends Component {
    state = {  }

    user = { }

    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.getTweets();
    }

    getTweets(){
        const userUrl = this.props.server_url + 'user/' + this.props.match.params.id;   
        axis.get(userUrl)
        .then(response => {
            console.log(response['data']);
            this.user = response['data'][0];
        });
        const tweetUrl = this.props.server_url + 'tweet/' + this.props.match.params.id;
        axis.get(tweetUrl)
        .then(response => {
            console.log(response['data']);
            this.setState({tweets: response['data']});
        });
    }

    handleValidCredential = data => {
        const followUrl = this.props.server_url + 'follow/' + data['id'] + '/' + this.props.match.params.id;   
        axis.get(followUrl)
        .then(response => {
            console.log(response['data']);
        });
        this.setState({followed: true});
        this.getTweets();
    }

    handleClick = () => {
        this.setState({
            login: true
        })
    }

    renderProfile(){
        if( 'login' in this.state && this.state.followed === undefined ){
            return <Login server_url={this.props.server_url} handleValidCredential = {this.handleValidCredential}/>
        }
        if( 'tweets' in this.state ){
            const items = this.state.tweets.map((tweet) => 
                <Tweet key={tweet['id']} item={tweet} />
            );
            return (
                <div>
                    <div className='info text-center'>
                        <h3>{this.user['name']}</h3>
                        <input type='button' onClick={this.handleClick} value='Follow' />
                    </div>
                    <div>
                        {items}
                    </div>
                </div>
            );
        }
        return ''
    }

    render() { 
        return ( 
            <div className='container'>
                <Nav />
                {this.renderProfile()}
            </div>
         );
    }
}
 
export default Profile;