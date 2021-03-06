import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StripeCheckout from '../StripeCheckout/StripeCheckout';
import './Header.css';

class Header extends Component {
  renderContent = () => {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        );
      default:
        return (
          <React.Fragment>
            <span className="header-item">
              <li>
                <StripeCheckout />
              </li>
              <li style={{ margin: '0 10px' }}>
                Credits: {this.props.auth.credits}
              </li>
            </span>

            <li>
              <a style={{ paddingLeft: '0px' }} href="/api/logout">
                Logout
              </a>
            </li>
          </React.Fragment>
        );
    }
  };
  render() {
    // console.log(this.props);
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            style={{ fontSize: '1.5rem', marginLeft: '5px' }}
            to={this.props.auth ? '/surveys' : '/'}
            className="left brand-logo"
          >
            Mailer
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}
const mapStateToProps = (state) => {
  return { auth: state.auth };
};
export default connect(mapStateToProps)(Header);
