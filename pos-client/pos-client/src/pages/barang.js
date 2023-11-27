import React, {useEffect, useState} from "react";
import Layout from "@/components/layouts/Layouts";
import api from "@/api";
import BarangList from '@/components/elements/Barang/Barang';
import styles from '@/styles/Barang.module.css'; // Import your CSS module


export default function Barang() {

  const[barang, setBarang] = useState([])

  const fetchBarang = async () => {
     const response = await api.get('/products');
     const data = await response.data.payload;
     setBarang(data)
  }
 



  useEffect(() => {
    fetchBarang();
  }, [])


  
 
  return (
    <Layout>
     <div className={styles.ok}>
      <h1>Home</h1>
      <button type="">+</button>
      </div>
      
      <BarangList barang={barang}/>
    </Layout>
  )
}
