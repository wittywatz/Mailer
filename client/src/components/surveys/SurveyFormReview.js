import React from 'react';
import { connect } from 'react-redux';
import { submitSurvey } from '../actions';
import formFields from './formFields';
import { useHistory } from 'react-router-dom';

const SurveyFormReview = ({ onBackClick, formValues, submitSurvey }) => {
  let history = useHistory();
  const renderContent = formFields.map(({ label, name }) => {
    return (
      <div key={name}>
        <label style={{ color: 'red', fontSize: '1.5rem' }}>{label}</label>
        <div style={{ marginBottom: '15px', fontSize: '1.2rem' }}>
          {formValues[name]}
        </div>
      </div>
    );
  });
  // const handleSubmit = async (formValues) => {
  //   await ;
  //   history.push('/surveys');
  // };
  // console.log(formValues.title);
  return (
    <div>
      <h3 style={{ textAlign: 'center', fontWeight: 'bolder' }}>
        SurveyForm Review
      </h3>
      {renderContent}
      <button
        onClick={onBackClick}
        className="yellow darken-3 btn-flat white-text"
      >
        Back
        <i className="material-icons left">chevron_left</i>
      </button>
      <button
        onClick={() => submitSurvey(formValues, history)}
        className="green btn-flat right white-text"
      >
        SendSurvey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { formValues: state.form.surveyForm.values };
};
export default connect(mapStateToProps, { submitSurvey })(SurveyFormReview);
