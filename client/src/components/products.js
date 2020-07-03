import React from 'react';
import axios from 'axios';

class Products extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            products: {}
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
        const products = await axios.get('http://localhost:5000/api/products');
        return products.data;
    }

    render(){
        console.log(this.state.products);
        const products = this.state.products.length ? this.state.products.map((product, index) =>{console.log(product); return <p>{product.name}</p>}) : '';
        console.log(products);
        return <div>{products}</div>
    }
}

export default Products;