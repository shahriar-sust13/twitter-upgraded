import React, { Component } from 'react';
import axios from "axios";

class PostTweet extends Component {
    state = { 
     }

    handleSubmit = event => {
        event.preventDefault();
        const data = new FormData(event.target);

        const tweeturl = this.props.server_url + 'new_tweet';

        console.log(tweeturl);

        axios.post(tweeturl, data)
        .then(response=>{
            console.log(response);
            
        })
        .catch(err => console.log(err));
    }

    render() { 
        return (
            <div className="">
                <h3>Enter a new tweet:</h3>
                <form onSubmit={ this.handleSubmit }>
                    <input type="hidden" name="author_id" value={this.props.owner_id} />
                    <input type="text" name="tweet" maxlength="120" minlength="1"/><br/>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}
 
export default PostTweet;