// DeleteConfirmation.js
import React from "react";
import styles from "./delet.module.css";
import { AiOutlineCloseCircle } from "react-icons/ai";

const DeleteConfirmation = ({ onCancel, onConfirm }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.iconContainer}>
          <AiOutlineCloseCircle
            className={styles.closeIcon}
            onClick={onCancel}
          />
          <span className={styles.hapusText}>Hapus</span>
        </div>
        <p>Apakah Anda yakin ingin menghapus menu ini?</p>
        <div className={styles.buttons}>
          <button onClick={onCancel} className={styles.noButton}>
            Tidak
          </button>
          <button onClick={onConfirm} className={styles.yesButton}>
            Ya
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
