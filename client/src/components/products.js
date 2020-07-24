import React from 'react';
import axios from 'axios';

function ProductImage(props){
    return (
        <img src={'/images/art/' + props.imageName} alt={props.imageTitle} />
    );
}

function ProductDescription(props){
    return (
        <div className="product-description">
            <p>{props.price}</p>
            <p>{props.title} - <span>{props.artist}</span></p>
            <p>{props.description}</p>            
        </div>
    );
}

function Product(props){
    console.dir(props);
    console.log(props);

    return(
        <div className="product">
            <ProductImage imageName={props.productData.imageName} imageTitle={props.productData.name} />
            <ProductDescription 
                title={props.productData.name} 
                description={props.productData.description} 
                quantity={props.productData.quantity}  
                price={props.productData.price.$numberDecimal}    
                artist={props.productData.artist}          
            />

            <button onClick={()=>(props.addToCart({...props.productData}))}>Add to cart</button>
           
        </div>        
    );
}

class ProductGallery extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            products: false
        }

        this.getProducts = this.getProducts.bind(this);
    }

    componentDidMount(){
        this.makeApiCall()
            .then( products => {this.setState({products})})
            .catch (() => {this.setState({products:'unable to retrieve products'})});
    }

    getProducts(){
        this.makeApiCall()
            .then( products => {this.setState({products})})
            .catch (() => {this.setState({products:'unable to retrieve products'})});
    }

    async makeApiCall(){
        try{
            const products = await axios.get('/api/products');
            return products.data;
        } catch(e){
            console.error('axios: ' + e);
        }
        
    }

    render(){
        const products = [];  
       
        if(this.state.products && this.state.products.length){
         this.state.products.forEach(        
            (product, index) => {
                //console.dir(product, {...product});       
                products.push(<Product productData={product} addToCart={this.props.addToCart}> <p>test</p></Product>);                                        
            });
        }

        return <div className="product-gallery">{products}</div>
    }
}

export default ProductGallery;