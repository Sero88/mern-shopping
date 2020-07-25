const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String, 
    description: String, 
    imageName: String, 
    stock: Number, 
    artist: String,
    categoryId: String, 
    price: Schema.Types.Decimal128
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema, 'Products');

module.exports = Product;