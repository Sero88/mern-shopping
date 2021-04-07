import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';

async function getTheProducts(){
    const response = await fetch('/api/products');
    return response.json();

}

function PurchaseConfirmation(){
    const location = useLocation();
    getTheProducts()
    .then( (data) => console.log(data) );
   /* useEffect(() => {
        getTheProducts()
        .then( (data) => useState(setProducts(data)))
    });*/
    
    return(
        <div className="page-container">
            <h1>Purchase Complete</h1>
            <p>Your order has been submitted. Thank you!</p>
            
        </div>    
    );
}

export default PurchaseConfirmation;