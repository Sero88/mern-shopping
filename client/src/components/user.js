import React from 'react';
import axios from 'axios';
import Cart from './cart';

function CurrentUser(props){
    return (
       <span>Welcome, {props.username}!</span>
    );
}

function UserLogin(props){
    if(props.authenticated){
        return '';
    } else{
        return <a href="/auth/google/">Login</a>
    }
}


class UserBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: '',
            authenticated: false
        }        
    }

    async makeApiCall(){
        try{
            const userData = await axios.get('/users');
            console.log('data ', userData.data);
            return userData.data;
        }
        catch(e){
            console.error('axios: ',  e);            
        }
    }

    componentDidMount(){
        this.makeApiCall()
            .then( (userData) => {
                if(userData && 'firstName' in userData){
                    this.setState({
                        user: userData,
                        authenticated: true
                    })
                }
                
            })
            .catch( (e) => console.error(e));
    }

    render(){
        const firstName = this.state.user.firstName ? this.state.user.firstName : 'Guest';
        return (
            <div>
                <CurrentUser username={firstName} />
                <UserLogin authenticated={this.state.authenticated} />
                <Cart cartData={this.props.cartData} />
            </div>
        );
    }
}

export default UserBar;