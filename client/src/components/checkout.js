import React from 'react';
import {loadStripe} from "@stripe/stripe-js";
import {Elements, CardElement, ElementsConsumer} from "@stripe/react-stripe-js";
import axios from 'axios';

//load stripe
const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);


function CardSection(props){
    return (
        <label>
            Card Details        
            <CardElement />
        </label>
    );
}

class PaymentForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {secret:''};
    }

    componentDidMount(){
        axios.post('/payments/create-payment-intent')
            .then( (response) => {
                this.setState({secret: response.data});
                console.log(this.state);
            })
            .catch( (error) => console.error('Unable to begin payment process', error) );
    }

    handleSubmit = async(event) => {
        event.preventDefault();

        const {stripe, elements, cartData} = this.props;
        console.log(this.props);

        if(!stripe || !elements){
            return;
        }

        const result = await stripe.confirmCardPayment('{CLIENT_SECRET', {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details:{
                    name: 'Jenny Rosen',
                },
            }
        });

        if(result.error){
            console.error(result.error.message);
        } else{
            if(result.paymentIntent.status === 'succeeded'){
                console.log('payment went through');
            }
        }
    };

    render(){
        return (
            
            <form onSubmit={this.handleSubmit}>
                <CardSection />
                <button disabled={!this.props.stripe}>Confirm order</button>
            </form>
        );
    }

    
}

class Checkout extends React.Component{
    constructor(props){
        super(props);       
    }

    render(){
        return(
            <div className="page-container">
                <h1>Checkout</h1>
                <div className="payment-form">
                    <Elements stripe={promise}> 
                        <ElementsConsumer>
                            {({stripe, elements}) => (                                
                                <PaymentForm cartData={this.props.cartData} stripe={stripe} elements={elements} />
                            )}
                        </ElementsConsumer>                                    
                    </Elements>
                </div>                
            </div>
        );
    }
}


export default Checkout;
