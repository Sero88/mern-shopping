import React from 'react';
import {loadStripe} from "@stripe/stripe-js";
import {Elements, CardElement, ElementsConsumer} from "@stripe/react-stripe-js";
import axios from 'axios';

//load stripe
const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

//show errors to the user
function PaymentError(props){
    if(props.error){
        return <div className="error">{props.error}</div>
    } else{
        return '';
    }
}

//render stripe card section
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
        this.state = {
            secret:'',
            error: '',
            canSubmit: true,
        };
    }

    componentDidMount(){
        
        //create a payment intent
        axios.post('/payments/create-payment-intent', {items:this.props.cartData})
        .then( (response) => {
            this.setState({secret: response.data.clientSecret});                  
        })
        .catch( (error) => {
            this.setState({error: "Something went wrong. Unable to process payment at the moment."});
            console.error(error);        
        });
               
    }


    handleSubmit = async(event) => {
        event.preventDefault();
    
        //get vars
        const {stripe, elements, user} = this.props;

        //return if any of the required props are not set
        if(!stripe || !elements || !user || !this.state.canSubmit){
            return;
        }

        //disable form submission until process is complete and clear errors
        this.setState(
            {
                canSubmit: false,
                error: '',
            }
        );

        //confirm card payment
        const result = await stripe.confirmCardPayment(this.state.secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details:{
                    name: user.userData.firstName,
                },
            }
        });


        if(result.error){
            this.setState( {
                error: result.error.message,
                canSubmit: true,
            })
        } else{
            if(result.paymentIntent.status === 'succeeded'){                                                                
                //decrease quantity of stock
                console.log(result.paymentIntent);

                //save transaction details - tied to login user
                //remove cart cookie
            }
        }
    };

    render(){

            return (                        
                <form onSubmit={this.handleSubmit}>
                    <CardSection />
                     {this.state.canSubmit ? <button className="submitPaymentButton" disabled={!this.props.stripe || !this.state.secret || !this.state.canSubmit}>Confirm order</button> : <div>Processing payment!<span className="loader-element"></span></div> }
                    <PaymentError error={this.state.error}/>
                </form>
            );
        /* else{
            return(
                <div>Processing payment!<span className="loader-element"></span></div>
            );
        }*/
        
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
