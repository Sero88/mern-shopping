const router = require('express').Router();
const Purchase = require('../models/purchase.model');
const Product = require('../models/product.model');

router.post('/', (req, res) => {

    const purchaseData = req.body.purchase;
    
    //verify a paymentIntent was created prior
    if( !('secret' in purchaseData) || purchaseData.secret != req.session.paymentSecret){
        return res.status(401).json('Forbidden');
    }

    //get items purchased
    const items = [];
    purchaseData.items.forEach( (item) => {
        items.push({id: item.itemData._id, quantity:item.quantity, price: item.itemData.price.$numberDecimal});
    });

    //overwrite items with new format for db
    purchaseData.items = items;

    //create a new purchase
    const purchaseRecord = new Purchase(purchaseData);
    purchaseRecord.save();

    //reduce stock amount in Product table
    Product.reduceStock(purchaseData.items);
    
    res.json('success');

});

module.exports = router;