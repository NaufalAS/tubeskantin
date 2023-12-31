const db = require("../config/connection");
const bcrypt = require('bcrypt');

// controllers/users.js

exports.registerUser = async (data) => {
    try {
      // Validasi konfirmasi kata sandi
      if (data.password !== data.confirm_password) {
        throw new Error('Password and confirm password do not match.');
      }
  
      // Melakukan hash password sebelum menyimpannya ke database
      const hashedPassword = await bcrypt.hash(data.password, 10);
  
      // Create a new user object with the hashed password
      const newUser = {
        username: data.username,
        email: data.email,
        role: data.role,
        password: hashedPassword,
      };
  
      // Perform the database query to insert the user into the users table
      const query = await db.query('INSERT INTO users SET ?', [newUser]);
  
      return { id: query.insertId };
    } catch (error) {
      console.error('Error registering user:', error);
      throw new Error('Error registering user. ' + error.message);
    }
  };

// login

exports.loginUser = async (username, password) => {
  try {
    // Replace this with your actual database query
    const user = await db.query('SELECT * FROM users WHERE username = ?', [username]);

    if (user.length === 0) {
      throw new Error('User not found. Check username.');
    }

    // Compare hashed password
    const passwordMatch = await bcrypt.compare(password, user[0].password);

    if (!passwordMatch) {
      throw new Error('Incorrect password.');
    }

    return {
      id: user[0].id,
      username: user[0].username,
      email: user[0].email,
      role: user[0].role,
    };
  } catch (error) {
    console.error('Error logging in:', error);
    throw new Error('Error logging in. ' + error.message);
  }
};
  