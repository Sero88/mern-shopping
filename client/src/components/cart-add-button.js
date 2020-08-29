import React from 'react';

function AddProductButton(props){
    //check to see if item is in cart - get the quantity in cart  
    const itemIndex = props.cartData.findIndex( (cartItem) => "itemData" in cartItem && cartItem.itemData._id === props.productData._id );
    const cartQuantity = itemIndex >= 0  ? props.cartData[itemIndex].quantity : 0;
    
    // can the add item button be displayed - must not go over stock quantity  
    if(props.productData.stock > 0  && props.productData.stock > cartQuantity){
        return <button onClick={()=>(props.addToCart({...props.productData}))}>{props.children}</button>
    } else{
        return <button disabled={true}>{props.children}</button>
    }
}

export default AddProductButton;