const stripe = require('stripe')(process.env.STRIPE_SECRET);
const router = require('express').Router();

function calculateOrderAmount(items){
    return 25625;
}

router.post('/create-payment-intent', async (req, res) => {
    
    //verify there are items, otherwise return error

    //get the total of the items

    //submit the paymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount('test'),
        currency: "usd",
        //stripe integration guide verification 
        //TODO  remove later
        metadata:{integration_check: 'accept_a_payment'}
    });

    res.send({
        clientSecret: paymentIntent.client_secret,        
    });
});


module.exports = router;
