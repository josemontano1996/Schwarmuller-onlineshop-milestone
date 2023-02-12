function isEmpty(value) {
  return !value || value.trim() === '';
}

function userDetailsAreValid(email, password, name, street, postalcode, city) {
  return (
    email &&
    email.includes('@') &&
    password &&
    password.trim().length > 5 &&
    !isEmpty(name) &&
    !isEmpty(street) &&
    !isEmpty(postalcode) &&
    !isEmpty(city)
  );
}

function emailIsConfirmed(email, confirmEmail) {
  return email === confirmEmail;
}

module.exports = {
  userDetailsAreValid: userDetailsAreValid,
  emailIsConfirmed: emailIsConfirmed,
};
