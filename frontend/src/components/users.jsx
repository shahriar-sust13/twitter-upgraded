import React, { Component } from 'react';
import axis from 'axios';
import Nav from './navbar';

class Users extends Component {
    state = {  }
    constructor(props){
        super(props);
    }

    componentDidMount(){
        const usersurl = this.props.server_url + 'allusers'
        axis.get(usersurl)
        .then(response => {
            console.log(response);
            this.setState({users: response['data']});
        });
    }

    renderUsers(){
        const pref = '/user/';
        if( 'users' in this.state ){
            const listItems = this.state.users.map((user) =>
                <li key={user['id']}><a href={pref+user['id']}>{user['name']}</a></li>
            );
            return listItems;
        }
        return '';
    }

    render() { 
        return (
            <div className='container'>
                <Nav logged={true} />
                <div className='text-center'>
                    <div className='col-md-12'>
                        <h3>This is the list of all users</h3>
                    </div>
                    <ul style={{'list-style-type': 'none'}}>
                        {this.renderUsers()}
                    </ul>
                </div>
            </div>
        )
    }
}
 
export default Users;