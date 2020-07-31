const { session } = require('passport');

const stripe = require('stripe')(process.env.STRIPE_SECRET);
const router = require('express').Router();

router.post('/create-payment-intent', async (req, res) => {
    
    //console.log(req.body.items[0].itemData.price.$numberDecimal);
    //verify there are items, otherwise return error
    if( !('items' in req.body) || req.body.items.length < 1 ){
        return res.status(400).json('no items found');
    }

    //get the total of the items
    const total = req.body.items.reduce( (total, item) => {        
        total += item.quantity * item.itemData.price.$numberDecimal;       
        return total; 
    }, 0);

    //submit the paymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total * 100, //amount in smallest currency unit accepted in USD: cents
        currency: "usd",
        //stripe integration guide verification 
        //TODO  remove later
        metadata:{integration_check: 'accept_a_payment'}
    });

    //add secret to the session
    req.session.paymentSecret = paymentIntent.client_secret;

    res.send({
        clientSecret: paymentIntent.client_secret,
        total: total            
    });
});


module.exports = router;
