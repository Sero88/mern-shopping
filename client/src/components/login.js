import React from 'react';
import axios from 'axios';

class Login extends React.Component{
    constructor(props){
        super(props);
        
        this.login = this.login.bind(this);
    }

    async makeApiCall(){
        try{
            const login = await axios.get('/users');
            return login.data;
        } catch(e){
            console.error('axios: ' + e);
        }
    }

    login(){
        this.makeApiCall()
        .then( (data) => console.log(data))
        .catch( (err) => console.error('there was an error: ',  err));
    }

    render(){
        return (
           <a href="/auth/google">Login</a>
        );
    }
}

export default Login;