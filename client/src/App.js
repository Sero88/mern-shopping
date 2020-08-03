import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {CookiesProvider, withCookies} from 'react-cookie';
import Home from './components/home';
import UserBar from './components/user';
import Checkout from './components/checkout';
import PurchaseConfirmation from './components/purchase-confirmation';



import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);    
    this.state = {
      cart:[], 
      user: {userData:{firstName:'Guest'}, authenticated: false}
    }

    this.cartCookie = 'cartCookie';
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.removeCartData = this.removeCartData.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }


  componentWillMount(){
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
    const cartData = this.state.cart;

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
    const {cookies} = this.props;
    cookies.set(this.cartCookie, cartData, {path: '/', sameSite:'strict'});

    //update the state
    this.setState({
      cart: cartData
    });

  }


  removeFromCart(item){
    const cartData = this.state.cart;
    
    //get the item's cart index 
    const itemIndex = cartData.findIndex( (item) => item.itemData._id == item.itemData._id);

    if(itemIndex >= 0){
      const quantity = cartData[itemIndex].quantity;

      if(quantity > 1){
        cartData[itemIndex].quantity--;
      } else{
        cartData.splice(itemIndex, 1);
      }
    }    

    //set the cookie
    const {cookies} = this.props;
    cookies.set(this.cartCookie, cartData, {path: '/', sameSite:'strict'});   
    
    this.setState({
      cart: cartData
    });
    
    console.log(cartData);
  }


  removeCartData(){
    const {cookies} = this.props;
    cookies.set(this.cartCookie, {},{path: '/', sameSite:'strict'} );
    this.setState({
      cart: []
    });

  }


  updateUser(userData, isAuth){
    this.setState(
      {user: {userData:userData, authenticated: isAuth} }
    );
  }


  render(){

    return (
      
      <CookiesProvider>
        <Router>
  
          <UserBar 
            user={this.state.user} 
            updateUser={this.updateUser} 
            cartData={this.state.cart} 
            removeFromCart={this.removeFromCart}
            props={{...this.props}}
            location={this.props.location}
          /> 
         

          {/* Routes */}
          <Route exact={true}
             path="/" 
             render={ 
              () => ( 
                <Home 
                  cartData={this.state.cart} 
                  addToCart={this.addToCart} 
                /> 
              )} 
          />

          <Route 
            exact={true} 
            path="/checkout" 
            render={ 
              ({location}) => (
                <Checkout 
                  location={location}
                  cartData={this.state.cart} 
                  removeCartData={this.removeCartData} 
                  user={this.state.user} 
                />
              )} 
            />

            <Route
              exact={true}
              path="/payment-confirmation"
              component={PurchaseConfirmation}
            />

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
