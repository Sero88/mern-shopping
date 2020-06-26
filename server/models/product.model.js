const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String, 
    description: String, 
    imageName: String, 
    quantity: Number, 
    artist: String,
    categoryId: String, 
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema, 'Products');

module.exports = Product;