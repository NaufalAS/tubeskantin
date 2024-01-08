// homeuser.js

import React, { useEffect, useState } from 'react';
import Layout from '@/components/layouts/Layout';
import api from '@/api';
import ProductList from '@/components/elements/ProductList/ProductList';
import CartUser from '@/components/elements/CartUser/CartUser';
import styles from '@/styles/Home.module.css';
import Cookies from 'js-cookie';  
import { useRouter } from 'next/router';

const HomeUser = () => {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  // Retrieve user information from cookies
  const userInfo = Cookies.getJSON('userInfo');
  const { username, id } = userInfo || {};

  const fetchProduct = async () => {
    try {
      const response = await api.get('/products');
      const data = await response.data.payload;
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <Layout>
      <div className={styles.ok}>
        <h1>Halaman Utama</h1>
        {/* <h1>Selamat datang di Halaman Utama, {username}! (ID Pengguna: {id})</h1> */}
      </div>
      <div className={styles.home}>
        <ProductList products={products} />
        <CartUser />
      </div>
    </Layout>
  );
};

export default HomeUser;
