import React, { Component } from 'react';

class Tweet extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <p>{this.props.item['author_name']}: {this.props.item['text']}</p>
            </div>
         );
    }
}
 
export default Tweet;