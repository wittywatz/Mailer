import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
  renderFields() {
    return formFields.map(({ name, label }) => {
      return (
        <div key={name}>
          <Field
            type="text"
            name={name}
            component={SurveyField}
            label={label}
          />
          {name === 'recipients' ? (
            <p style={{ fontWeight: 'bold' }}>
              <span style={{ color: 'red', fontSize: '1.2rem' }}>Note:</span>{' '}
              Emails should be separated by commas <br />
              Only a maximum of 5 emails are allowed at this point
            </p>
          ) : null}
        </div>
      );
    });
  }
  render() {
    return (
      <div style={{ marginTop: '20px' }}>
        <form onSubmit={this.props.handleSubmit(this.props.onNextClick)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel <i className="material-icons left">clear</i>
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next <i className="material-icons right">done</i>
          </button>
        </form>
        <p style={{ color: 'red', fontSize: '1.5rem', textAlign: 'center' }}>
          *To try stripe payment in test mode, use the details below to add
          credits* <br /> 4242 4242 4242 4242 - Exp 12/23 - CVV: 123
        </p>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  errors.recipients = validateEmails(values.recipients || '');
  formFields.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide the ${name}`;
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  destroyOnUnmount: false,
  form: 'surveyForm',
})(SurveyForm);
