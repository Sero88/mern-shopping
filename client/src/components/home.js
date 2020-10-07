import React, {Suspense} from 'react';
import axios from 'axios';
const ProductGallery = React.lazy( () => import ('./products') );

class Home extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return (
            <div>
                <h1>Shop</h1>
                <Suspense fallback={<div>Loading products...</div>}>
                    <ProductGallery cartData={this.props.cartData} addToCart={this.props.addToCart}/>                    
                </Suspense> 
            </div>
            
        );
    }
}

export default Home;