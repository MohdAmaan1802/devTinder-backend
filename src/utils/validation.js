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

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "age",
    "about",
    "gender",
    "photoUrl",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
  return isEditAllowed;
};

const validatePasswordChangeData = (req) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new Error("Old password and new password are required");
  } else if (oldPassword === newPassword) {
    throw new Error("New password must be different from old password");
  }
};

module.exports = { validateSignUpData, validateEditProfileData };
