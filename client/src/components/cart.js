import React from 'react';
import CartTotal from './cart-total';

class Cart extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){

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
    }
}

export default Cart;