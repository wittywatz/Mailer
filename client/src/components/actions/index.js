import axios from 'axios';
import { FETCH_SURVEYS, FETCH_USER } from './types';
// import { useHistory } from 'react-router-dom';

export const fetchUser = () => async (dispatch) => {
  const user = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: user.data });
};

export const handleStripeToken = (token) => async (dispatch) => {
  const response = await axios.post('/api/stripe', token);
  dispatch({ type: FETCH_USER, payload: response.data });
};

export const submitSurvey = (values, history) => async (dispatch) => {
  // let history = useHistory();
  const response = await axios.post('/api/surveys', values);
  history.push('/surveys');
  dispatch({ type: FETCH_USER, payload: response.data });
};

export const fetchSurveys = () => async (dispatch) => {
  const surveys = await axios.get('/api/surveys');
  dispatch({ type: FETCH_SURVEYS, payload: surveys.data });
};
