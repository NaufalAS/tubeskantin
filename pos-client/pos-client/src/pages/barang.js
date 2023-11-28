import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";  // Correct import statement
import Layout from "@/components/layouts/Layouts";
import api from "@/api";
import BarangList from "@/components/elements/Barang/Barang";
import styles from "@/styles/Barang.module.css";

export default function Barang() {
  const [barang, setBarang] = useState([]);
  const router = useRouter();  // Use the useRouter hook

  const fetchBarang = async () => {
    const response = await api.get('/products');
    const data = await response.data.payload;
    setBarang(data);
  }
  const fetchBarangById = async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      const data = response.data.payload;
      setBarang(data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };
  
  

  const navigateToInputBarang = () => {
    router.push("/inputbarang");
  }

  useEffect(() => {
    fetchBarang();
    // fetchBarangEdit();
  }, []);

  return (
    <Layout>
      <div className={styles.ok}>
        <h1>Home</h1>
        <button onClick={navigateToInputBarang}>+</button>
      </div>
      
      <BarangList barang={barang}/>
    </Layout>
  )
}
