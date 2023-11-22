const db = require("../config/connection"); 
const multer = require('multer');

exports.fetchProduct = async () => {
    const query = db.query("SELECT * FROM products")
    return query
};

// exports.addProduct = async (data) => {
//     const query = await db.query("INSERT INTO products SET ?", [data])
//     return { id: query.insertId }
// };

// Konfigurasi multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Folder tempat menyimpan gambar
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Nama file yang disimpan
    },
  });
  
  const upload = multer({ storage: storage }).single('image'); // 'image' adalah nama field di form
  
  exports.addProduct = async (data) => {
    try {
      const query = await db.query("INSERT INTO products SET ?", [data]);
      return { id: query.insertId };
    } catch (error) {
      console.error("Error saving product to database:", error);
      throw new Error('Error saving product to database.');
    }
  };

  exports.deleteProduct = async (productId) => {
    try {
      const query = await db.query("DELETE FROM products WHERE id = ?", [productId]);
      return { message: 'Product deleted successfully.' };
    } catch (error) {
      console.error("Error deleting product from database:", error);
      throw new Error('Error deleting product from database.');
    }
  };

 
// controllers/products.js

// ...

exports.fetchProductById = async (productId) => {
    try {
        const query = await db.query("SELECT * FROM products WHERE id = ?", [productId]);
        return query[0];
    } catch (error) {
        console.error("Error fetching product by ID from database:", error);
        throw new Error('Error fetching product by ID from database.');
    }
};  

// ...
exports.updateProduct = async (productId, data) => {
    try {
      const query = await db.query("UPDATE products SET ? WHERE id = ?", [data, productId]);
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
  

// controllers/products.js

// ...
// controllers/products.js

// ...

// controllers/products.js

// ...

