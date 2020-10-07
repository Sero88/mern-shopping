import React, {Suspense, lazy} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {CookiesProvider, withCookies} from 'react-cookie';
import Home from './components/home';
import UserBar from './components/user';
import PurchaseConfirmation from './components/purchase-confirmation';
import './App.scss';

const Checkout = lazy(() => import('./components/checkout'));
const Cart = React.lazy( () => import('./components/cart') ); 

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
    this.setQuantity = this.setQuantity.bind(this);
    this.loadCart = this.loadCart.bind(this);
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

    console.log(item);

    //does the item already exist - if so increase cart quantity, else add to cart
    const itemIndex = cartData.findIndex( (cartItem) => item._id == cartItem.itemData._id );

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
    const itemIndex = cartData.findIndex( (cartItem) => cartItem.itemData._id == item.itemData._id);

    if(itemIndex >= 0){
      const quantity = cartData[itemIndex].quantity;

      if(quantity > 1){
        cartData[itemIndex].quantity--;
      } else{
        cartData.splice(itemIndex, 1);
      }

      //set the cookie
      const {cookies} = this.props;
      cookies.set(this.cartCookie, cartData, {path: '/', sameSite:'strict'});   
      
      this.setState({
        cart: cartData
      });
    }    

  }


  setQuantity(event, item){
    event.preventDefault();
    const cartData = this.state.cart;
    const input = event.target.value;

    
    //get the item's cart index 
    const itemIndex = cartData.findIndex( (cartItem) => cartItem.itemData._id == item.itemData._id);

    if(itemIndex >= 0){
      const quantity = cartData[itemIndex].quantity;

      if(input >= 1){
        cartData[itemIndex].quantity = input
      } else{
        cartData.splice(itemIndex, 1);
      }

      //set the cookie
      const {cookies} = this.props;
      cookies.set(this.cartCookie, cartData, {path: '/', sameSite:'strict'});   
      
      this.setState({
        cart: cartData
      });
    }    

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

  loadCart(){
    return(
        <Suspense fallback={<div>Loading...</div>}>
            <Cart 
                cartData={this.state.cart} 
                removeFromCart={this.removeFromCart} 
                addToCart={this.addToCart}
                setQuantity={this.setQuantity} />
        </Suspense>
    );
}


  render(){

    console.log(this.props);
    return (
      
      <CookiesProvider>
        <Router>
          <Suspense fallback={<div>Loading...</div>} >
          <header>
            <UserBar 
              user={this.state.user} 
              updateUser={this.updateUser}                    
            /> 
           {this.loadCart()}
          </header>
          
         
          <main>
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
          </main>
          
        
        </Suspense>      
        </Router>
      </CookiesProvider>
    );
  }
  
}

export default withCookies(App);
