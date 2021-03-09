const URL = 'https://mailer-app-watson.herokuapp.com';
module.exports = (survey) => {
  return `
  <html>
    <body>
      <div style='text-align: center;'>
        <h3>I would like your input</h3>
        <p>Please answer the following question:</p>
        <p>${survey.body}</p>
        <div>
          <a href="${URL}/api/surveys/${survey._id}/yes">Yes</a>
        </div>
        <div>
          <a href="${URL}/api/surveys/${survey._id}/no">No</a>
        </div>
      </div>
    </body>
  </html>
  `;
};
