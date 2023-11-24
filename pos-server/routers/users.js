const express = require("express");
const response = require("../helpers/response");
const users = express.Router();
const { registerUser } = require("../controllers/users");


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

module.exports = users;
