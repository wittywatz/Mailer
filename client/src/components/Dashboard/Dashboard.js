import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SurveyList from '../surveys/SurveyList';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <p style={{ color: 'red', fontSize: '1.5rem', textAlign: 'center' }}>
          *To try stripe payment in test mode, use the details below to add
          credits* <br /> 4242 4242 4242 4242 - Exp 12/23 - CVV: 123
        </p>
        <SurveyList />
        <div className="fixed-action-btn">
          <Link to="/surveys/new" className="btn-floating btn-large red">
            <i className="large material-icons">add</i>
          </Link>
        </div>
      </div>
    );
  }
}

export default Dashboard;
