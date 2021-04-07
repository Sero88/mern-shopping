import React from 'react';
import AddProductButton from './cart-add-button';



function CartTotal(props){    

    function getTotal(){
        const total = props.cartData.reduce( (total, item) => {        
            total += item.quantity * item.itemData.price.$numberDecimal;       
            return total; 
        }, 0);
        
        return total;
    }

    function showModQuantity(item){      
        return(
            <>
                <button onClick={() => props.removeFromCart(item)}>-</button>                                                                         
                <span>{item.quantity}</span>
                <AddProductButton
                    addToCart={props.addToCart} 
                    productData={item.itemData} 
                    cartData={props.cartData}                                                                   
                >+</AddProductButton>
            </>
        );
        
    }

    const items = props.cartData.map( (item) => {
        return (
            <tr>
                <td>{item.itemData.name}</td>
                <td>{props.allowModify ? showModQuantity(item) : item.quantity }</td>
                <td>{item.itemData.price.$numberDecimal}</td>
            </tr>
        );
    });
    return (
        <div className="cart-total">
            <table className="mb-4">
            <thead>   
                <tr>
                    <th>Product</th>
                    <th>Qty.</th>
                    <th>Price</th>
                </tr>                             
            </thead>
            <tbody>
                {items}
            </tbody>
        </table>    
        <p><strong>Total: ${props.total ? props.total : getTotal()}</strong></p>
        </div>
        
    );
}


export default CartTotal;
