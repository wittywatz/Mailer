import React, { Component } from 'react';
import ReactStripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { handleStripeToken } from '../actions';
import './Stripy.css';

class StripeCheckout extends Component {
  render() {
    return (
      <div>
        <ReactStripeCheckout
          name={'Mailer'}
          description={'Pay for Email'}
          amount={500}
          token={(token) => this.props.handleStripeToken(token)}
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
        >
          <button className="btn button-content"></button>
        </ReactStripeCheckout>
      </div>
    );
  }
}
export default connect(null, { handleStripeToken })(StripeCheckout);
