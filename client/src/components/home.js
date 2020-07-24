import React from 'react';
import axios from 'axios';
import ProductGallery from './products';

class Home extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return (
            <div>
                <h1>Shop</h1>
                <ProductGallery addToCart={this.props.addToCart}/>
            </div>
            
        );
    }
}

export default Home;