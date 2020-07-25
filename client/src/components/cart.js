import React from 'react';

class Cart extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <div>
                {this.props.cartData.map(
                    (item) => (
                        <p key={'cart'+item.itemData.name}>{item.itemData.name} <span>qty.{item.quantity}</span></p>)                        
                    )}
            </div>
        );
    }
}

export default Cart;