import React, { Component } from 'react'

export default class stripe extends Component {


    componentWillMount() {

            // Require the Stripe library with a test secret key.
        const stripe = require('stripe')('sk_test_BQokikJOvBiI2HlWgH4olfQ2');

        // Create a payment intent to start a purchase flow.
        let paymentIntent = await stripe.paymentIntents.create({
            amount: 20,
            currency: 'usd',
            description: 'My first payment',
        });

        // Complete the payment using a test card.
        paymentIntent = await stripe.paymentIntents.confirm(paymentIntent.id, {
        payment_method: 'pm_card_amex',
    });

    }
    render() {
        return (
            <main classname="container">
                <h1 classname="covalewnce-blue">Buy Now {this.state.name}</h1>
            </main>
        )
    }
}

export default stripe
