const express = require("express");
const response = require("../helpers/response");
const users = express.Router();
const { registerUser, loginUser } = require("../controllers/users");


// Endpoint untuk registrasi pengguna
users.route("/register").post(async (req, res) => {
  try {
    const userData = {
      username: req.body.username,
      email: req.body.email,
      role: req.body.role,
      password: req.body.password,
      confirm_password: req.body.confirm_password,
    };

    const result = await registerUser(userData);
    response.success(result, 'User registered successfully!', res);
  } catch (error) {
    response.error({ error: 'Error registering user.' }, req.originalUrl, 500, res);
  }
});



// Endpoint lain untuk operasi pengguna lainnya dapat ditambahkan di sini

// Endpoint untuk login pengguna
users.route("/login").post(async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await loginUser(username, password);
    response.success(result, 'User logged in successfully!', res);
  } catch (error) {
    console.error('Error logging in:', error);
    response.error({ error: 'Error logging in. ' + error.message }, req.originalUrl, 500, res);
  }
});

module.exports = users;
