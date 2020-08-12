import React from 'react';

function CartTotal(props){    
    const items = props.cartData.map( (item) => {
        return (
            <tr>
                <td>{item.itemData.name}</td>
                <td>{item.quantity}</td>
                <td>{item.itemData.price.$numberDecimal}</td>
            </tr>
        );
    });
    console.log(items);
    return (
        <div>
            <table>
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
        {props.total && <p><strong>Total: ${props.total}</strong></p>}
        </div>
        
    );
}


export default CartTotal;
