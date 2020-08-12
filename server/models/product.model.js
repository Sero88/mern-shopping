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

Product.reduceStock = (items) => {    
    items.forEach( async (item) => {
        const product = await Product.find({_id: item.id});
        product[0].stock -= item.quantity;
        product[0].save({timestamps: false});
    })
}

module.exports = Product;