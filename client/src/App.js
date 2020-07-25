import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {CookiesProvider, withCookies} from 'react-cookie';
import Home from './components/home';
import UserBar from './components/user';


import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);    
    this.state = {
      cart:[]
    }

    this.cartCookie = 'cartCookie';
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount(){
    //get the cookie
    const {cookies} = this.props;          
    const cookieData = cookies.get(this.cartCookie) || [];

    //if cookie data exists update cart state
    if(cookieData.length > 0){
      this.setState({
        cart: cookieData
      })
    }
  }


  addToCart(item) {
    //get the cookie
    const {cookies} = this.props;
    const cartData = cookies.get(this.cartCookie) || [];

    //does the item already exist - if so increase cart quantity, else add to cart
    const itemIndex = cartData.findIndex( (cartItem) => "itemData" in cartItem && cartItem.itemData._id === item._id );

    if(itemIndex >= 0){
      //item.stock <= cartData[itemIndex].quantity + 1 ? cartData[itemIndex].quantity++ : 
      cartData[itemIndex].quantity++;
    } else{
      cartData.push({
        quantity: 1,
        itemData: item
      })
    }

    //set the cookie
    cookies.set(this.cartCookie, cartData, {path: '/', sameSite:'strict'});

    //update the state
    this.setState({
      cart: cartData
    });

  }

  render(){

    return (
      <CookiesProvider>
        <Router>
    
          <UserBar cartData={this.state.cart}/> 

          {/* Routes */}
          <Route exact={true} path="/" render={ () => ( <Home cartData={this.state.cart} addToCart={this.addToCart} /> ) } />   
          
        </Router>
      </CookiesProvider>
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

export default withCookies(App);
