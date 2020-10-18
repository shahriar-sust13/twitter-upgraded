import React, { Component } from 'react';
import axios from "axios";
import PostTweet from './posttweet';
import Tweet from './tweet';

class Tweets extends Component {
    state = { 
    }

    componentDidMount(){
        const newsfeedurl = this.props.server_url + 'newsfeed/' + this.props.user['id'];

        console.log(newsfeedurl);

        axios.get(newsfeedurl)
        .then(response=>{
            console.log(response);
            const tweets = response['data'];
            console.log(tweets);
            
            this.setState({
                items: tweets
            });
            
            console.log('done');
        })
        .catch(err => console.log(err));
    }


    showTweets(){
        if( 'items' in this.state ){
            const messages = this.state.items.map((tweet) => 
                <Tweet key={tweet['id']} item={tweet} />
            );
            return messages;
        }
        return '';
        
    }

    render() { 
        return (<div>
            <PostTweet server_url = {this.props.server_url} owner_id={this.props.user['id']}/>
            {this.showTweets()}
        </div>);
    }
}
 
export default Tweets;