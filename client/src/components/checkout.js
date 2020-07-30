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
        console.log(this.props);
        
        axios.post('/payments/create-payment-intent', {items:this.props.cartData})
        .then( (response) => {
            this.setState({secret: response.data.clientSecret});     
            console.log(response.data);           
        })
        .catch( (error) => console.error('Unable to begin payment process', error) );
        
       
    }

    handleSubmit = async(event) => {
        event.preventDefault();

        const {stripe, elements, cartData, user} = this.props;
        console.log(this.props);

        if(!stripe || !elements){
            return;
        }

        const result = await stripe.confirmCardPayment(this.state.secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details:{
                    name: user.userData.FirstName,
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
                <button disabled={!this.props.stripe || !this.state.secret}>Confirm order</button>
            </form>
        );
    }

    
}

class Checkout extends React.Component{
    constructor(props){
        super(props);       
    }

    render(){
        
        //if cart is empty - show message, else show the payment form
        if(this.props.cartData.length <= 0){
            return <div>Cart is empty</div>;
        } else{
            return(
                <div className="page-container">
                    <h1>Checkout</h1>
                    <div className="payment-form">
                        <Elements stripe={promise}> 
                            <ElementsConsumer>
                                {({stripe, elements}) => (                                
                                    <PaymentForm cartData={this.props.cartData} stripe={stripe} elements={elements} user={this.props.user} />
                                )}
                            </ElementsConsumer>                                    
                        </Elements>
                    </div>                
                </div>
            );
        }

        
    }
}


export default Checkout;
