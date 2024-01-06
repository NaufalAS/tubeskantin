const express = require("express");
const transactions = express.Router();
const response = require("../helpers/response");

const { randomOrderNumber } = require("../helpers/utils")
const { fetchTransaction, addTransaction, updateTransaction, updateTransaction1 } = require('../controllers/transactions')

transactions.route('/').post(async (req, res) => {
    const { total_price, paid_amount, products, kembalian,status_makanan, status_pembayaran, pembeli } = req.body
	
    const order = {
        no_order: randomOrderNumber(), total_price, paid_amount, kembalian, status_makanan, status_pembayaran, pembeli
    }
 
	try {
		const result = await addTransaction(order, products);
		response.success(result, "transaction created!", res)
	}
	catch(err) {
		response.error({ error: err.message }, req.originalUrl, 403, res)
	}
})

transactions.route("/").get(async (req, res) => {
	try {
		const result = await fetchTransaction();
		response.success(result, "transaction fetched!", res)
	}
	catch(err) {
		response.error({ error: err.message }, req.originalUrl, 403, res) 
	}
	
});


transactions.route("/:no_order/edit").put(async (req, res) => {
	const orderNo = req.params.no_order;
	const data = {
	  status_makanan: req.body.status_makanan
	};
  
	try {
	  const result = await updateTransaction(orderNo, data);
	  res.json({ success: true, message: 'Transaction status updated!', data: result });
	} catch (error) {
	  console.error('Error updating transaction status:', error);
	  res.status(500).json({ success: false, error: 'Error updating transaction status.' });
	}
  });
  
  transactions.route("/:no_order/edit1").put(async (req, res) => {
	const orderNo = req.params.no_order;
	const data = {
	  status_pembayaran: req.body.status_pembayaran,
	};
  
	try {
	  const result = await updateTransaction1(orderNo, data);
	  res.json({ success: true, message: 'Transaction status updated!', data: result });
	} catch (error) {
	  console.error('Error updating transaction status:', error);
	  res.status(500).json({ success: false, error: 'Error updating transaction status.' });
	}
  });

module.exports = transactions;
