const express = require('express')
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const port = 3000


app.use(bodyParser.json())
app.use(cors())
app.use('/uploads', express.static('uploads'));

app.get("/", (req, res) => {
	res.send("API Ready To GO!");
});

app.get("/", (req, res) => {
	res.send("API Ready To GO!");
});

const product = require("./routers/products");
const transactions = require("./routers/transactions");
const users = require("./routers/users");


app.use('/uploads', express.static('uploads'));
app.use("/products", product);
app.use("/transactions", transactions);
app.use("/users", users);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})