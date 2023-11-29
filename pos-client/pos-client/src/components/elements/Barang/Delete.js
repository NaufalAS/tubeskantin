// import React from "react";
// import styles from "./delet.module.css";
// import { AiOutlineCloseCircle } from "react-icons/ai";

// const DeleteConfirmation = ({ onCancel, onConfirm, id }) => {
//   const handleConfirmDelete = async () => {
//     try {
//       const response = await fetch(`http://localhost:3000/products/${id}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.ok) {
//         console.log("Produk berhasil dihapus!");
//         // Tambahkan logika pembaruan UI jika diperlukan
//         router.push('/barang'); // Adjust the path based on your actual route
//       } else {
//         console.error("Gagal menghapus produk");
//         // Handle error, tampilkan pesan, dll.
//       }
//     } catch (error) {
//       console.error("Error menghapus produk:", error);
//       // Handle error, tampilkan pesan, dll.
//     }
//   };

//   return (
//     <div className={styles.overlay}>
//       <div className={styles.popup}>
//         <div className={styles.iconContainer}>
//           <AiOutlineCloseCircle
//             className={styles.closeIcon}
//             onClick={onCancel}
//           />
//           <span className={styles.hapusText}>Hapus</span>
//         </div>
//         <p>Apakah Anda yakin ingin menghapus menu ini?</p>
//         <div className={styles.buttons}>
//           <button onClick={onCancel} className={styles.noButton}>
//             Tidak
//           </button>
//           <button onClick={handleConfirmDelete} className={styles.yesButton}>
//             Ya, Saya yakin
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeleteConfirmation;


import React from "react";
import styles from "./delet.module.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useRouter } from "next/router"; // Import the router

const DeleteConfirmation = ({ onCancel, onConfirm, id }) => {
  const router = useRouter(); // Initialize the router

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
        router.push('/barang'); // Redirect to /barang
          // Muat ulang halaman
      window.location.reload();
    
        // Close the popup
        onConfirm(); // This should handle hiding or closing the popup
      } else {
        console.error("Gagal menghapus produk");
        // Handle error, tampilkan pesan, dll.
      }    
    } catch (error) {
      console.error("Error menghapus produk:", error);
      // Handle error, tampilkan pesan, dll.
    }
  };

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
          <button onClick={handleConfirmDelete} className={styles.yesButton}>
            Ya, Saya yakin
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
