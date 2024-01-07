const db = require("../config/connection");

exports.fetchTransaction = async () => {
    const query = await db.query(`
        SELECT 
            t.*, 
            i.no_order,
            i.quantity,
            p.nama AS product_name,
            u.username AS user_name  
        FROM 
            transactions AS t
            INNER JOIN transaction_detail AS i ON t.no_order = i.no_order 
            LEFT JOIN products AS p ON i.id_product = p.id
            LEFT JOIN users AS u ON t.pembeli = u.id
    `);

    if (!query.error) {
        let listTransactions = [], listDetail = [], lastPush = "";
        
        for (let index in query) {
            if (lastPush !== query[index].no_order) {
                for (let i in query) {
                    if (query[i].no_order === query[index].no_order) {
                        listDetail.push({
                            no_order: query[i].no_order,
                            product: query[i].product_name,
                            quantity: query[i].quantity,
                        });
                    }
                }
                listTransactions.push({
                    no_order: query[index].no_order,
                    total_price: query[index].total_price,
                    paid_amount: query[index].paid_amount,
                    kembalian: query[index].kembalian,
                    status_makanan: query[index].status_makanan,
                    status_pembayaran: query[index].status_pembayaran,
                    user: query[index].user_name,
                    products: listDetail,
                });
                listDetail = [];
                lastPush = query[index].no_order;
            }
        }
        return { transactions: listTransactions };
    } else {
        console.error("Error fetching transactions:", query.error);
        throw new Error('Error fetching transactions.');
    }
};



//
exports.addTransaction = async (order, products) => {
  const query = await db.query("INSERT INTO transactions SET ?", [order]);
  
  if (!query.error) {
      const transaction_detail = [];
      const product_id = [];
      
      products.forEach((product) => {
          transaction_detail.push([order.no_order, product.id, product.quantity]);
          product_id.push([product.id]);
      });

      const updateDetailStock = await addDetailTransaction(transaction_detail, product_id);

      if (!updateDetailStock.error) {
          return db.query("SELECT * FROM transactions WHERE no_order = ?", [order.no_order]);
      }
      return updateDetailStock;
  } else {
      console.error("Error creating transaction:", query.error);
      throw new Error('Error creating transaction.');
  }
}



// 👇 internal function 👇

async function addDetailTransaction(transaction_detail, product_id) {
	const query = await db.query("INSERT INTO transaction_detail(no_order,id_product,quantity) VALUES ?", [transaction_detail])

	if (!query.error) {
		return updateStock(transaction_detail, product_id);
	}
};


async function updateStock(transaction_detail, product_id) {
  const query = await db.query("SELECT stock FROM products WHERE id IN (?)", [product_id]);

  if (!query.error && query.length === product_id.length) {
      const update_stock = [];

      query.forEach((res, i) => {
          update_stock.push([
              product_id[i][0],  // Menggunakan product_id sebagai ID produk
              res.stock - transaction_detail[i][2],
          ]);
      });

      const update = await db.query("INSERT INTO products (id, stock) VALUES ? ON DUPLICATE KEY UPDATE stock = VALUES(stock)", [update_stock]);

      return update;
  } else {
      console.error("Error fetching product stock:", query.error);
      throw new Error('Error fetching product stock.');
  }
}



///
exports.updateTransaction = async (orderNo, data) => {
    try {
      const query = await db.query("UPDATE transactions SET ? WHERE no_order = ?", [data, orderNo]);
      if (query.affectedRows > 0) {
        return { message: 'Product updated successfully.' };
      } else {
        throw new Error('No rows were affected by the update.');
      }
    } catch (error) {
      console.error("Error updating product in database:", error);
      throw new Error('Error updating product in database. ' + error.message);
    }
  };
  
  exports.updateTransaction1 = async (orderNo, data) => {
    try {
      const query = await db.query("UPDATE transactions SET ? WHERE no_order = ?", [data, orderNo]);
      if (query.affectedRows > 0) {
        return { message: 'Product updated successfully.' };
      } else {
        throw new Error('No rows were affected by the update.');
      }
    } catch (error) {
      console.error("Error updating product in database:", error);
      throw new Error('Error updating product in database. ' + error.message);
    }
  };