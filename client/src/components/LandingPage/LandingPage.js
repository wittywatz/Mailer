/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
// import Carousel from '@brainhubeu/react-carousel';
// import '@brainhubeu/react-carousel/lib/style.css';
// import ancient from '../images/ancient.jpg';
// import ancient2 from '../images/ancient2.jpg';
import './LandingPage.css';

class LandingPage extends Component {
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner">
          <div className="landing-content">
            <div className="actual-landing-content">
              <p className="catch-phrase">
                <span style={{ fontSize: '5rem' }}>F</span>ed up with
                conventional customer feedback system?
              </p>
              <p style={{}}>Make your customer feedback process alot easier</p>
              <p>
                Join{' '}
                <span style={{ color: '#ee6d72', fontSize: '3rem' }}>
                  Mailer
                </span>{' '}
                today
              </p>
              <button className="bbttnn">
                <a href="/auth/google">SIGN UP</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default LandingPage;
