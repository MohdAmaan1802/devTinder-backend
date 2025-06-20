const validate = require("validator");

const validateSignUpData = (req) => {
  const { emailId, password, firstName, lastName } = req.body;
  if (!firstName || !lastName) {
    throw new Error("First name and last name are required");
    `
    `;
  } else if (!validate.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validate.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }
};

module.exports = { validateSignUpData };
