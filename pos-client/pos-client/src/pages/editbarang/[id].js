// // pages/editbarang/[id].js
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import api from '@/api';
// import styles from "@/styles/Edit.module.css";

// const EditBarang = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [editedProduct, setEditedProduct] = useState({
//     nama: '',
//     harga: '',
//     stock: '',
//     image: null,
//     category: '', // Add category to the state
//   });

//   useEffect(() => {
//     const fetchProductById = async () => {
//       try {
//         const response = await api.get(`/products/${id}`);
//         const result = response.data.payload;

//         if (response.status === 200) {
//           setProduct(result);
//           setEditedProduct({
//             nama: result.nama,
//             harga: result.harga,
//             stock: result.stock,
//             image: result.image || null,
//             category: result.category || '', // Set category from result or empty string
//           });
//         } else {
//           console.error('Error fetching product details:', result);
//         }
//       } catch (error) {
//         console.error('Error fetching product details:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchProductById();
//     }
//   }, [id]);

//   // const handleChange = (e) => {
//   //   const { name, value, type, files } = e.target;

//   //   if (type === 'file') {
//   //     const selectedImage = files[0];
//   //     setEditedProduct((prevProduct) => ({
//   //       ...prevProduct,
//   //       [name]: selectedImage,
//   //     }));
//   //   } else {
//   //     setEditedProduct((prevProduct) => ({
//   //       ...prevProduct,
//   //       [name]: value,
//   //     }));
//   //   }
//   // };

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
  
//     if (type === 'file') {
//       const selectedImage = files[0];
//       setPreviewImage(URL.createObjectURL(selectedImage));
//       setEditedProduct((prevProduct) => ({
//         ...prevProduct,
//         [name]: selectedImage,
//         category: selectedImage ? selectedImage.name : prevProduct.category, // Update category with image name
//       }));
//     } else {
//       setEditedProduct((prevProduct) => ({
//         ...prevProduct,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSave = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('nama', editedProduct.nama);
//       formData.append('harga', editedProduct.harga);
//       formData.append('stock', editedProduct.stock);
//       formData.append('image', editedProduct.image);
//       formData.append('category', editedProduct.category); // Append category to FormData

//       const response = await api.put(`/products/${id}`, formData);

//       if (response.status === 200) {
//         console.log('Product updated successfully:', response.data);
//       } else {
//         console.error('Error updating product:', response.data);
//       }
//     } catch (error) {
//       console.error('Error updating product:', error);
//     }
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (!product) {
//     return <p>Product not found</p>;
//   }

//   return (
//     <div className={styles.inputContainer}>
//       <h1>Edit Barang {id}</h1>
//       <img src={editedProduct.image} alt="Current Product" style={{ maxWidth: '200px' }} />
//       <form className={styles.inputForm}>
//         <div className={styles.label}>
//           <h3>Nama:</h3>
//           <input
//             type="text"
//             name="nama"
//             value={editedProduct.nama}
//             onChange={handleChange}
//             className={styles.input}
//           />
//         </div>
//         <div className={styles.label}>
//           <h3>Harga:</h3>
//           <input
//             type="text"
//             name="harga"
//             value={editedProduct.harga}
//             onChange={handleChange}
//             className={styles.input}
//           />
//         </div>
//         <div className={styles.label}>
//           <h3>Stok:</h3>
//           <input
//             type="text"
//             name="stock"
//             value={editedProduct.stock}
//             onChange={handleChange}
//             className={styles.input}
//           />
//         </div>
//         <div className={styles.label}>
//           <h3>Gambar:</h3>
//           <input
//             type="file"
//             name="image"
//             onChange={handleChange}
//             className={styles.input}
//           />
//         </div>
//         <div className={styles.label}>
//           <h3>Kategori:</h3>
//           <input
//             type="text"
//             name="category"
//             value={editedProduct.category}
//             onChange={handleChange}
//             className={styles.input}
//           />
//         </div>
//         <button type="button" onClick={handleSave} className={styles.button}>
//           Save Changes
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditBarang;

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '@/api';
import styles from "@/styles/Edit.module.css";

const EditBarang = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editedProduct, setEditedProduct] = useState({
    nama: '',
    harga: '',
    stock: '',
    image: null,
    imageName: '', // Add imageName state
    category: '', 
  });

  // ... (previous code)

useEffect(() => {
  const fetchProductById = async () => {
    try {
      const response = await api.get(`/products/${id}`);
      const result = response.data.payload;

      if (response.status === 200) {
        setProduct(result);
        const imageName = result.image ? result.image.replace('http://localhost:3000/uploads/', '') : '';
        setEditedProduct({
          nama: result.nama,
          harga: result.harga,
          stock: result.stock,
          image: result.image || null,
          imageName: imageName, // Update imageName without the prefix
          category: result.kategori,
        });
      } else {
        console.error('Error fetching product details:', result);
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (id) {
    fetchProductById();
  }
}, [id]);

// ... (rest of the code)

  const handleChange = (e) => {
    const { name, type, files } = e.target;

    if (type === 'file') {
      const selectedImage = files[0];
      setEditedProduct((prevProduct) => ({
        ...prevProduct,
        [name]: selectedImage,
        imageName: selectedImage ? selectedImage.name : '', // Update imageName
      }));
    } else {
      const { value } = e.target;
      setEditedProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('nama', editedProduct.nama);
      formData.append('harga', editedProduct.harga);
      formData.append('kategori', editedProduct.category); // Use 'kategori' instead of 'category' if that's what your server expects
      formData.append('stock', editedProduct.stock);
      
      // Check if a new image is selected
      if (editedProduct.image) {
        formData.append('image', editedProduct.image);
      }
  
      const response = await api.patch(`/products/${id}/edit`, formData);
  
      if (response.status === 200) {
        console.log('Product updated successfully:', response.data);
        // Navigate back to the 'barang.js' page
        router.push('/barang'); // Adjust the path based on your actual route
      } else {
        console.error('Error updating product:', response.data);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  
  
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className={styles.inputContainer}>
      <h1>Edit Barang {id}</h1>
      <form className={styles.inputForm}>
        <div className={styles.label}>
          <h3>Nama:</h3>
          <input
            type="text"
            name="nama"
            value={editedProduct.nama}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.label}>
          <h3>Harga:</h3>
          <input
            type="text"
            name="harga"
            value={editedProduct.harga}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.label}>
          <h3>Stok:</h3>
          <input
            type="text"
            name="stock"
            value={editedProduct.stock}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.label}>
          <h3>Gambar:</h3>
          <label htmlFor="image" className={styles.input}>
  Choose a file
  {editedProduct.imageName && (
    <p>Nama File: {editedProduct.imageName}</p>
  )}
  <input
    type="file"
    id="image"
    name="image"
    onChange={handleChange}
    className={styles.input}
  />
</label>

        </div>
        <div className={styles.label}>
          <h3>Kategori:</h3>
          <input
            type="text"
            name="category"
            value={editedProduct.kategori}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <button type="button" onClick={handleSave} className={styles.button}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditBarang;
