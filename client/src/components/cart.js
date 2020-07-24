import React from 'react';

class Cart extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <div>
                {this.props.cartData.map((item) => <p>{item.name}</p>)}
            </div>
        );
    }
}

export default Cart;