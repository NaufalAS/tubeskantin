import React, { useState } from 'react';
import axios from 'axios'; 
import styles from "@/styles/Input.module.css";

const InputBarang = () => {
  const [barang, setBarang] = useState({
    nama: '',
    harga: '',
    stock: '',
    image: null,
    kategori: '', // New category field
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      const selectedImage = files[0];
      setBarang((prevBarang) => ({
        ...prevBarang,
        [name]: selectedImage,
      }));
    } else {
      setBarang((prevBarang) => ({
        ...prevBarang,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nama', barang.nama);
    formData.append('harga', barang.harga);
    formData.append('stock', barang.stock);
    formData.append('image', barang.image);
    formData.append('kategori', barang.kategori); // Include category in form data

    try {
      const response = await axios.post('http://localhost:3000/products/upload', formData);
      console.log('Server Response:', response.data);

      setBarang({ 
        nama: '',
        harga: '',
        stock: '',
        image: null,
        kategori: '', // Clear the category after submission
      });

      // Redirect to the "/barang" page
      window.location.href = '/barang';
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div className={styles.inputContainer}>
      <h2>Input Barang Page</h2>
      <form className={styles.inputForm} onSubmit={handleSubmit}>
        <label className={styles.label}>
          <h3>Menu:</h3>
          <input
            type="text"
            name="nama"
            value={barang.nama}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
        <br />
        <label className={styles.label}>
          <h3>Harga:</h3>
          <input
            type="text"
            name="harga"
            value={barang.harga}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
        <br />
        <label className={styles.label}>
          <h3>Stok:</h3>
          <input
            type="text"
            name="stock"
            value={barang.stock}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
        <br />
        <label className={styles.label}>
          <h3>Gambar:</h3>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className={styles.input}
          />
        </label>
        <br />
        <label className={styles.label}>
          <h3>Kategori:</h3>
          <input
            type="text"
            name="kategori"
            value={barang.kategori}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
        <br />
        <button type="submit" className={styles.button}>
          Simpan Barang
        </button>
      </form>
    </div>
  );
};

export default InputBarang;
