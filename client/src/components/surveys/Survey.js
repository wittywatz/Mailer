import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class Survey extends Component {
  state = { showformReview: false };
  renderContent() {
    if (!this.state.showformReview) {
      return (
        <SurveyForm
          onNextClick={() => this.setState({ showformReview: true })}
        />
      );
    }
    return (
      <SurveyFormReview
        onBackClick={() => this.setState({ showformReview: false })}
      />
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}
export default reduxForm({ form: 'surveyForm' })(Survey);
