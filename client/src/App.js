import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Home from './components/home';
import UserBar from './components/user';


import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);    
    this.state = {
      cart:[]
    }

    this.addToCart = this.addToCart.bind(this);
  }



  addToCart(item) {
    this.state.cart.push(item);           
    this.setState({
      cart: this.state.cart
    });

    console.log('added to cart' , this.state.cart);
  }

  render(){
    console.log({...this.state.cart});
    return (
      <Router>
  
        <UserBar cartData={this.state.cart}/> 


        {/* Routes */}
        <Route exact={true} path="/" render={ () => ( <Home addToCart={this.addToCart} /> ) } />   
        
      </Router>
        
      /*
           <div className="App">
        <header className="App-header">
          <p>
            Name of Store with Logo
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React {props.myVar}
          </a>
        </header>
        <main>
          <Products />
        </main>
      </div>
      */
  
    );
  }
  
}

export default App;
