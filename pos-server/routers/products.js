const express = require("express");
const response = require("../helpers/response");
const products = express.Router();
const multer = require('multer');
const { fetchProduct, addProduct, deleteProduct, updateProduct, fetchProductById } = require("../controllers/products");

// Konfigurasi multer untuk upload gambar
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage }).single('image');

// Endpoint untuk upload gambar dan data produk
products.route("/upload").post(async (req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      response.error({ error: 'Error uploading image.' }, req.originalUrl, 500, res);
    } else if (err) {
      response.error({ error: 'Unknown error uploading image.' }, req.originalUrl, 500, res);
    } else {
      // Data produk yang akan disimpan
      const data = {
        nama: req.body.nama,
        harga: req.body.harga,
        stock: req.body.stock,
        image: req.file.filename,
      };

      // Simpan data produk ke database
      try {
        const result = await addProduct(data);
        response.success(result, 'Product created!', res);
      } catch (error) {
        response.error({ error: 'Error saving product to database.' }, req.originalUrl, 500, res);
      }
    }
  });
});

// Endpoint untuk fetch produk (sudah ada)
products.route("/").get(async (req, res) => {
  try {
    const result = await fetchProduct();
    response.success(result, "Product fetched!", res);
  } catch (err) {
    response.error({ error: err.message }, req.originalUrl, 403, res);
  }
});

// Endpoint untuk menghapus produk berdasarkan ID
products.route("/:id").delete(async (req, res) => {
	const productId = req.params.id;
  
	try {
	  const result = await deleteProduct(productId);
	  response.success(result, 'Product deleted!', res);
	} catch (error) {
	  response.error({ error: 'Error deleting product from database.' }, req.originalUrl, 500, res);
	}
  });

  products.route("/:id").get(async (req, res) => {
	const productId = req.params.id;
  
	try {
	  const result = await fetchProductById(productId);
	  if (result) {
		response.success(result, `Product with ID ${productId} fetched!`, res);
	  } else {
		response.error({ error: `Product with ID ${productId} not found.` }, req.originalUrl, 404, res);
	  }
	} catch (error) {
	  response.error({ error: 'Error fetching product from database.' }, req.originalUrl, 500, res);
	}
  });


  //
 // routers/products.js

// ...

// Endpoint untuk edit gambar dan data produk
products.route("/:id/edit").patch(async (req, res) => {
	const productId = req.params.id;
  
	upload(req, res, async function (err) {
	  if (err instanceof multer.MulterError) {
		response.error({ error: 'Error uploading image.' }, req.originalUrl, 500, res);
	  } else if (err) {
		response.error({ error: 'Unknown error uploading image.' }, req.originalUrl, 500, res);
	  } else {
		// Data produk yang akan diubah
		const data = {
		  nama: req.body.nama,
		  harga: req.body.harga,
		  stock: req.body.stock,
		  image: req.file ? req.file.filename : undefined,  // Periksa apakah req.file ada
		};
  
		try {
		  const result = await updateProduct(productId, data);
		  response.success(result, 'Product updated!', res);
		} catch (error) {
		  response.error({ error: 'Error updating product in database.' }, req.originalUrl, 500, res);
		}
	  }
	});
  });
  

// ...


module.exports = products;
