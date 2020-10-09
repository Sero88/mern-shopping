import React from 'react';
import CartTotal from './cart-total';
import {withRouter} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';


class Cart extends React.Component{
    constructor(props){
        super(props);
        this.excludeCartPages = ['/checkout'];

        this.cartTotal = document.querySelector('.cart-total');
        console.log('cartTotal', this.cartTotal);
    }
    
    showTotal = () => {   
        const cartTotal = document.querySelector('.cart-total');         
        cartTotal.style.display = 'block';
    }

    hideTotal = () => {
        const cartTotal = document.querySelector('.cart-total');
        cartTotal.style.display = "none";
    }
    
    render(){
       
        if( !this.excludeCartPages.includes(this.props.location.pathname))
            return(                               
                <div className="cart" onMouseEnter={this.showTotal} onMouseLeave={this.hideTotal}>
                    <span className="btn btn-link"><FontAwesomeIcon icon={faShoppingCart} onClick={this.showTotal}/></span>

                    <CartTotal 
                        cartData={this.props.cartData} 
                        allowModify={true}
                        addToCart={this.props.addToCart}
                        removeFromCart={this.props.removeFromCart}
                    />
                    <a className="btn btn-link" href="/checkout">Checkout</a>
                </div>
            );
        else{
            return null;
        }
    }
}

export default withRouter(Cart);