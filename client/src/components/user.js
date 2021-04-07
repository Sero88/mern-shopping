import React, {Suspense} from 'react';
import axios from 'axios';

function CurrentUser(props){
    return (
       <span>Welcome, {props.username}!</span>
    );
}

function UserLogin(props){
    if(props.authenticated){
        return '';
    } else{
        return <a className="btn btn-link" href="/auth/google/">Login</a>
    }
}


class UserBar extends React.Component{
    constructor(props){
        super(props);           
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
                    this.props.updateUser(userData, true);
                }                
            })
            .catch( (e) => console.error(e));
    }


    render(){
        
        return (
            <div className="user-bar col-12 col-sm-6 text-sm-right">
                <CurrentUser username={this.props.user.userData.firstName} />
                <UserLogin authenticated={this.props.user.authenticated} />                                                    
            </div>
        );
    }
}

export default UserBar;