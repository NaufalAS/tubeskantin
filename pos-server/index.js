const express = require('express')
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(cors())

app.get("/", (req, res) => {
	res.send("API Ready To GO!");
});

app.get("/", (req, res) => {
	res.send("API Ready To GO!");
});

const product = require("./routers/products");
const transactions = require("./routers/transactions");

app.use("/products", product);
app.use("/transactions", transactions);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})