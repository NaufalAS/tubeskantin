// // DetailProduct.js
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import api from '@/api';
// import styles from '@/styles/Edit.module.css';

// const DetailProduct = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProductById = async () => {
//       try {
//         const response = await api.get(`/products/${id}`);
//         const result = response.data.payload;

//         if (response.status === 200) {
//           setProduct(result);
//           setLoading(false);
//         } else {
//           console.error('Error fetching product details:', result);
//           setLoading(false);
//         }
//       } catch (error) {
//         console.error('Error fetching product details:', error);
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchProductById();
//     }
//   }, [id]);

//   useEffect(() => {
//     // Retrieve product data from the query parameters
//     const { product: productData } = router.query;
//     if (productData) {
//       setProduct(JSON.parse(productData));
//     }
//   }, [router.query]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (!product) {
//     return <p>Product not found</p>;
//   }

//   return (
//     <div className={styles.productDetail}>
//       <h1>{product.nama}</h1>
//       <p>Harga: {product.harga}</p>
//       <p>Stok: {product.stock}</p>
//       {/* Add more details as needed */}

//       {/* Render the product image */}
//       {product.image && (
//         <img
//           src={`http://localhost:3000/uploads/${product.image}`}
//           alt={product.nama}
//           style={{ maxWidth: '100%' }}
//         />
//       )}
//     </div>
//   );
// };

// export default DetailProduct;

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '@/api';
import styles from '@/styles/Edit.module.css';

const DetailProduct = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result;
        // Jika id ada, ambil data produk dari server
        if (id) {
          const response = await api.get(`/products/${id}`);
          result = response.data.payload;
        } else {
          // Jika id tidak ada, cek apakah ada data produk di query parameters
          const { product: productData } = router.query;
          result = JSON.parse(productData);
        }

        if (result) {
          setProduct(result);
        } else {
          console.error('Product data not found.');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, router.query]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className={styles.productDetail}>
      <h1>{product.nama}</h1>
      <p>Harga: {product.harga}</p>
      <p>Stok: {product.stock}</p>
      {/* Add more details as needed */}

      {/* Render the product image */}
      {product.image && (
        <img
          src={`http://localhost:3000/uploads/${product.image}`}
          alt={product.nama}
          style={{ maxWidth: '100%' }}
        />
      )}
    </div>
  );
};

export default DetailProduct;
