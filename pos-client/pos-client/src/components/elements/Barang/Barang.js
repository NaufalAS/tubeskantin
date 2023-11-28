// BarangList.js
import React from "react";
import styles from './index.module.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useRouter } from 'next/router';

const BarangList = ({ barang }) => {
  const router = useRouter();

  const handleEdit = (id) => {
    // Find the product by ID
    const editedProduct = barang.find(product => product.id === id);

    // Navigasi ke halaman editbarang.js dengan menggunakan router.push
    router.push({
      pathname: `/editbarang${id}}`,
      // query: { product: JSON.stringify(editedProduct) },
    });
  };

  return (
    <div className={styles['transaction-list']}>
      {barang.map((barang, index) => (
        <div key={index} className={styles['transaction-list__card']}>
          <div className={styles['transaction-list__card__product-barang']}>
            <div className={styles['transaction-list__card__barang-list']}>
              <img
                src={barang.image}
                alt={barang.nama}
                style={{ objectFit: 'cover' }}
                loading="lazy"
              />
            </div>
            <div className={styles['transaction-list__card__products-barang__desc']}>
              <h3>Nama Menu: {barang.nama}</h3>
              <p>Harga: {barang.harga}</p>
              <p>Stok: {barang.stock}</p>
            </div>
            <div className={styles['transaction-list__card__icons']}>
              {/* Menggunakan onClick untuk menangani event klik */}
              <FaEdit
                className={styles['edit-icon']}
                onClick={() => handleEdit(barang.id)}
              />
              <FaTrash className={styles['delete-icon']} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BarangList;