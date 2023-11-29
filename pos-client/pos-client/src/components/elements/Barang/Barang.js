import React, { useState } from "react";
import styles from "./index.module.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useRouter } from "next/router";
import DeleteConfirmation from "./Delete";

const BarangList = ({ barang }) => {
  const router = useRouter();
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleEdit = (id) => {
    router.push({
      pathname: `/editbarang/${id}`,
    });
  };

  const handleDelete = (id) => {
    setDeleteConfirmationVisible(true);
    setSelectedProductId(id);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationVisible(false);
    setSelectedProductId(null);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Produk berhasil dihapus!");
        // Tambahkan logika pembaruan UI jika diperlukan
      } else {
        console.error("Gagal menghapus produk");
        // Handle error, tampilkan pesan, dll.
      }
    } catch (error) {
      console.error("Error menghapus produk:", error);
      // Handle error, tampilkan pesan, dll.
    }

    // Setelah penghapusan selesai
    setDeleteConfirmationVisible(false);
    setSelectedProductId(null);
  };

  return (
    <div className={styles["transaction-list"]}>
      {barang && barang.map((barang, index) => (
        <div key={index} className={styles["transaction-list__card"]}>
          <div className={styles["transaction-list__card__product-barang"]}>
            <div className={styles["transaction-list__card__barang-list"]}>
              <img
                src={barang.image}
                alt={barang.nama}
                style={{ objectFit: "cover" }}
                loading="lazy"
              />
            </div>
            <div className={styles["transaction-list__card__products-barang__desc"]}>
              <h3>Nama Menu: {barang.nama}</h3>
              <p>Harga: {barang.harga}</p>
              <p>Stok: {barang.stock}</p>
            </div>
            <div className={styles["transaction-list__card__icons"]}>
              <FaEdit
                className={styles["edit-icon"]}
                onClick={() => handleEdit(barang.id)}
              />
              <FaTrash
                className={styles["delete-icon"]}
                onClick={() => handleDelete(barang.id)}
              />
            </div>
          </div>
        </div>
      ))}

      {deleteConfirmationVisible && (
       // Inside the render method of BarangList or wherever you use DeleteConfirmation
<DeleteConfirmation
  onCancel={handleCancelDelete}
  onConfirm={handleConfirmDelete}
  id={selectedProductId}
/>

      )}
    </div>
  );
};

export default BarangList;
