import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './authReducer';
import surveyReducer from './surveyReducer';

export default combineReducers({
  auth: authReducer,
  surveys: surveyReducer,
  form,
});
