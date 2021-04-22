import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../actions';
class SurveyList extends Component {
  componentDidMount() {
    // console.log(this.props.surveys);
    this.props.fetchSurveys();
  }

  showSurveys = () => {
    return (
      this.props.surveys &&
      this.props.surveys.reverse().map((survey) => {
        return (
          <div
            style={{
              boxShadow: '5px 5px 10px #ee6d72',
              padding: '10px',
              marginBottom: '10px',
            }}
            className="blue-grey darken-1"
            key={survey._id}
          >
            <h5>{survey.title.toUpperCase()}</h5>
            <p>
              <span style={{ color: '#ffab40' }}>Body: </span>
              {survey.body}
            </p>
            <p>
              <span style={{ color: '#ffab40' }}>Date Sent: </span>
              {new Date(survey.createdAt).toLocaleDateString()}
            </p>
            <p>
              <span style={{ color: '#ffab40' }}>Last responded: </span>
              {survey.updatedAt === survey.createdAt
                ? 'No response yet'
                : new Date(survey.updatedAt).toLocaleDateString()}
            </p>
            <span style={{ color: '#ffab40' }}>{`Yes: ${
              survey.yes
            } ${'    '}   No: ${survey.no} `}</span>
          </div>
        );
      })
    );
  };
  render() {
    return <div>{this.showSurveys()}</div>;
  }
}
const mapStateToProps = ({ surveys }) => {
  // console.log(surveys);
  return { surveys };
};

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
