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
            style={{ boxShadow: '5px 5px 10px #ee6d72' }}
            className="card blue-grey darken-1"
            key={survey._id}
          >
            <div style={{ marginBottom: '5px' }} className="card-content">
              <span className="card-title">{survey.title.toUpperCase()}</span>
              <p className="left">{survey.body}</p>
              <p className="right">{`Date Sent: ${new Date(
                survey.createdAt
              ).toLocaleDateString()}`}</p>
            </div>
            {/* <hr style={{ padding: '0', margin: '0' }} /> */}
            <div
              style={{ paddingTop: '10px', marginBottom: '10px' }}
              className="card-content"
            >
              <span className="left" style={{ color: '#ffab40' }}>{`Yes: ${
                survey.yes
              } ${'    '}   No: ${survey.no} `}</span>
              <span className="right">
                {survey.updatedAt === survey.createdAt
                  ? 'No response yet'
                  : `Last Responded: ${new Date(
                      survey.updatedAt
                    ).toLocaleDateString()}`}
              </span>
            </div>
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
