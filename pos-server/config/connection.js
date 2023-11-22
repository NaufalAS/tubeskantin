const mysql = require("mysql");
const util = require("util");
const dotenv = require("dotenv");

dotenv.config();

const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
});

connection.query = util.promisify(connection.query).bind(connection);

connection.connect(function (err) {
	if (err) {
		console.log("error connecting: " + err.stack);
		return;
	}
	console.log("connected");
});

module.exports = connection;
