import React from 'react';
import axios from 'axios';
import AddProductButton from './cart-add-button';

function ProductImage(props){
    return (
        <img className="card-img-top" src={'/images/art/' + props.imageName} alt={props.imageTitle} />
    );
}

function ProductDescription(props){
    return (
        <div className="product-description">
            <p className="text-right">${props.price}</p>
            <h2 className="h5 mb-0">{props.title}</h2>
            <p><span><em>{props.artist}</em></span></p>
            <p>{props.description}</p>            
        </div>
    );
}



function Product(props){
    return(
        <div className="product col-12  mb-4">
            <div className="card h-100">
            <ProductImage         
                imageName={props.productData.imageName} 
                imageTitle={props.productData.name} 
            />
                <div className="card-body">
                

            <ProductDescription 
                title={props.productData.name} 
                description={props.productData.description} 
                quantity={props.productData.quantity}  
                price={props.productData.price.$numberDecimal}    
                artist={props.productData.artist}          
            />

            <AddProductButton 
                addToCart={props.addToCart} 
                productData={props.productData} 
                cartData={props.cartData}
                className="btn btn-secondary"
            > Add to Cart </AddProductButton>
                </div>
            
            </div>
            
           
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
            return null;
        }
        
    }

    render(){
        const products = [];  
        if(this.state.products && this.state.products.length){
         this.state.products.forEach(        
            (product, index) => {                           
                products.push(
                    <Product key={"product"+product.name} 
                        productData={product} 
                        addToCart={this.props.addToCart} 
                        cartData={this.props.cartData}> 
                            <p>test</p>
                    </Product>
                    );                                                        
            });
        } else if(this.state.products == null){
           products.push(<p className="error">Something went wrong. Unable to retrieve products.</p>)
        }

        return <div className="product-gallery row row-cols-md-2">{products}</div>
    }
}

export default ProductGallery;