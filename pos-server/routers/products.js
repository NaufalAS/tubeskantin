const express = require("express");
const response = require("../helpers/response");
const products = express.Router();
const multer = require('multer');
const { fetchProduct, addProduct, deleteProduct, updateProduct, fetchProductById } = require("../controllers/products");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage }).single('image');

products.route("/upload").post(async (req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      response.error({ error: 'Error uploading image.' }, req.originalUrl, 500, res);
    } else if (err) {
      response.error({ error: 'Unknown error uploading image.' }, req.originalUrl, 500, res);
    } else {
      const data = {
        nama: req.body.nama,
        harga: req.body.harga,
        kategori: req.body.kategori,
        stock: req.body.stock,
        image: req.file ? req.file.filename : null,
      };

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
        // Pastikan untuk mengirimkan path gambar yang benar
        const productsWithImageUrl = result.map(product => ({
            ...product,
            image: `http://localhost:3000/uploads/${product.image}`
        }));
        response.success(productsWithImageUrl, "Product fetched!", res);
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

// routers/products.js

products.route("/:id").get(async (req, res) => {
  const productId = req.params.id;

  try {
    const result = await fetchProductById(productId);
    
    if (result) {
      // Pastikan untuk mengirimkan path gambar yang benar
      result.image = result.image ? `http://localhost:3000/uploads/${result.image}` : null;

      response.success(result, `Product with ID ${productId} fetched!`, res);
    } else {
      response.error({ error: `Product with ID ${productId} not found.` }, req.originalUrl, 404, res);
    }
  } catch (err) {
    response.error({ error: err.message }, req.originalUrl, 500, res);
  }
});




  //
 // routers/products.js

// ...

// Endpoint untuk edit gambar dan data produk
products.route("/:id/edit").put(async (req, res) => {
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
		  kategori: req.body.kategori,
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
