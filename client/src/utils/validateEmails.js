// eslint-disable-next-line import/no-anonymous-default-export
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// eslint-disable-next-line import/no-anonymous-default-export
export default (emails) => {
  const lengthcheck = emails.split(',');
  if (lengthcheck.length > 5) {
    return `Due to test session, a maximum of 5 mails is required at this point, you entered ${
      lengthcheck.length
    } emails. Sorry, you'd need to remove ${
      lengthcheck.length - 5
    } emails from the field.`;
  }
  const invalidEmails = emails
    .split(',')
    .map((email) => email.trim())
    .filter((email) => re.test(email) === false);
  //Return mails that are invalid
  if (invalidEmails.length) {
    return `These emails are invalid ${invalidEmails}`;
  }
  return;
};
