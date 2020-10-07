import React from 'react';
import CartTotal from './cart-total';
import {withRouter} from 'react-router-dom';

class Cart extends React.Component{
    constructor(props){
        super(props);
        this.excludeCartPages = ['/checkout'];
    }
    
    
    render(){
       
        if( !this.excludeCartPages.includes(this.props.location.pathname))
            return(                               
                <div className="cart">
                    <CartTotal 
                        cartData={this.props.cartData} 
                        allowModify={true}
                        addToCart={this.props.addToCart}
                        removeFromCart={this.props.removeFromCart}
                    />
                    <a href="/checkout">Checkout</a>
                </div>
            );
        else{
            return null;
        }
    }
}

export default withRouter(Cart);