import React, {Suspense} from 'react';
import axios from 'axios';
//import Cart from './cart';
const Cart = React.lazy( () => import('./cart') ); 

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
                <Suspense fallback={<div>Loading...</div>}>
                    <Cart cartData={this.props.cartData} removeFromCart={this.props.removeFromCart} />
                </Suspense>
                
               
            </div>
        );
    }
}

export default UserBar;