import React, { Component } from 'react';
import Nav from './navbar';

class Welcome extends Component {
    state = {  }
    render() {
        return ( 
            <div className='container'>
                <Nav logged={true} />
            </div>
        )
    }
}
 
export default Welcome;