import React from "react";
import styles from './index.module.css';
import { useCartDispatch } from "@/context/CartContext";
import { FaEdit, FaTrash } from 'react-icons/fa'; 

const BarangList = ({ barang }) => {
  const cartDispatch = useCartDispatch();

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
              <FaEdit className={styles['edit-icon']} />
              <FaTrash className={styles['delete-icon']} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BarangList;
