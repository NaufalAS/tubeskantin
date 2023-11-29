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
//     imageName: '',
//     kategori: '',
//   });

//   useEffect(() => {
//     const fetchProductById = async () => {
//       try {
//         const response = await api.get(`/products/${id}`);
//         const result = response.data.payload;

//         if (response.status === 200) {
//           setProduct(result);
//           const imageName = result.image ? result.image.replace('http://localhost:3000/uploads/', '') : '';
//           setEditedProduct({
//             nama: result.nama,
//             harga: result.harga,
//             stock: result.stock,
//             image: result.image || null,
//             imageName: imageName,
//             kategori: result.kategori,
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

//   const handleChange = (e) => {
//     const { name, type, files } = e.target;

//     if (type === 'file') {
//       const selectedImage = files[0];
//       setEditedProduct((prevProduct) => ({
//         ...prevProduct,
//         [name]: selectedImage,
//         imageName: selectedImage ? selectedImage.name : '',
//       }));
//       // Menampilkan nama file di samping input
//       const fileNameDisplay = document.getElementById('fileNameDisplay');
//       if (fileNameDisplay) {
//         fileNameDisplay.textContent = selectedImage ? selectedImage.name : '';
//       }
//     } else {
//       const { value } = e.target;
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
//       formData.append('kategori', editedProduct.kategori);
//       formData.append('stock', editedProduct.stock);

//       if (editedProduct.image) {
//         formData.append('image', editedProduct.image);
//       }

//       const response = await api.put(`/products/${id}/edit`, formData);

//       if (response.status === 200) {
//         console.log('Product updated successfully:', response.data);
//         router.push('/barang');
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
//           <div className={styles.input}>
//             <input
//               type="file"
//               name="image"
//               onChange={handleChange}
//               className={styles.hiddenInput}
//             />
//             <span id="fileNameDisplay">{editedProduct.imageName}</span>
//           </div>
//         </div>
//         <div className={styles.label}>
//           <h3>Kategori:</h3>
//           <input
//             type="text"
//             name="kategori"
//             value={editedProduct.kategori}
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



// pages/editbarang/[id].js
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
    imageName: '',
    kategori: '',
  });

  const [selectedImageFile, setSelectedImageFile] = useState(null);

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
            imageName: imageName,
            kategori: result.kategori,
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

  const handleChange = (e) => {
    const { name, type, files } = e.target;

    if (type === 'file') {
      const selectedImage = files[0];
      setSelectedImageFile(selectedImage); // Menyimpan nilai input file
      setEditedProduct((prevProduct) => ({
        ...prevProduct,
        [name]: selectedImage,
        imageName: selectedImage ? selectedImage.name : '',
      }));
      // Menampilkan nama file di samping input
      const fileNameDisplay = document.getElementById('fileNameDisplay');
      if (fileNameDisplay) {
        fileNameDisplay.textContent = selectedImage ? selectedImage.name : '';
      }
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
      formData.append('kategori', editedProduct.kategori);
      formData.append('stock', editedProduct.stock);

      if (selectedImageFile) {
        formData.append('image', selectedImageFile);
      }

      const response = await api.put(`/products/${id}/edit`, formData);

      if (response.status === 200) {
        console.log('Product updated successfully:', response.data);
        router.push('/barang');
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
          <div className={styles.input}>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className={styles.hiddenInput}
            />
            <span id="fileNameDisplay">{selectedImageFile ? selectedImageFile.name : editedProduct.imageName}</span>
          </div>
        </div>
        <div className={styles.label}>
          <h3>Kategori:</h3>
          <input
            type="text"
            name="kategori"
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
