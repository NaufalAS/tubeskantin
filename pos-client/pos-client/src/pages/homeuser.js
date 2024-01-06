import React, {useEffect, useState} from "react";
import Layout from "@/components/layouts/Layout";
import api from "@/api";
import ProductList from "@/components/elements/ProductList/ProductList";
import Cart from "@/components/elements/Cart/Cart";
import styles from '@/styles/Home.module.css';
import CartUser from "@/components/elements/CartUser/CartUser";

export default function Home() {

  const[products, setProducts] = useState([])

  const fetchProduct = async () => {
     const response = await api.get('/products');
     const data = await response.data.payload;
     setProducts(data)
  }
 



  useEffect(() => {
    fetchProduct();
  }, [])


  
  return (
    <Layout>
      <div className={styles.ok}>
      <h1>Home</h1>
      </div>
      <div className={styles.home}>
      <ProductList products={products}/>

      <CartUser />
     
      </div>
      
    </Layout>
  )
}
