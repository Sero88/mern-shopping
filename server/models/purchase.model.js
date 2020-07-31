const mongoose = require("mongoose");
const {Schema} = mongoose;

const purchaseSchema = new Schema({    
    buyerId: String, 
    paymentTransId: String, 
    paymentMethod: String, 
    date: Date,
    total: Number,
    items: Array,    
});

const Purchase = mongoose.model('Purchase', purchaseSchema, 'Purchases' );


module.exports = Purchase;
