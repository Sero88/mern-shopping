import React from 'react';

class Cart extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <div className="cart">
                {this.props.cartData.map(
                    (item) => (
                        <div className="cartItem" key={'cart'+item.itemData.name} > 
                            <p>{item.itemData.name} <span>qty.{item.quantity}</span></p>                        
                            <button onClick={() => this.props.removeFromCart(item)}>Remove Item </button>                     
                            </div>
                    )
                    )}
            </div>
        );
    }
}

export default Cart;