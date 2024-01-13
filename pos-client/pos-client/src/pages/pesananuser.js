import React, { useState, useEffect } from 'react';
import Layout from "@/components/layouts/Layout";
import api from '@/api';
import PesananUser from '@/components/elements/PesananUser/PesananUser';
import Cookies from 'js-cookie';

export default function Transaction() {
  const [transactionList, setTransactionList] = useState([]);

  const fetchTransactions = async () => {
    try {
      // Retrieve user information from cookies
      const userInfo = Cookies.getJSON('userInfo');
      const { id } = userInfo || {};

      if (!id) {
        // Handle the case where there is no user ID
        console.error('User ID is missing.');
        return;
      }

      const response = await api.get(`/transactions/byBuyer/${id}`);
      const data = response.data.payload.transactions;
      setTransactionList(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      // Handle the error more gracefully, e.g., show an error message to the user
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <Layout>
      <h1>Pemesanan</h1>
      <PesananUser transactionList={transactionList} />
    </Layout>
  );
}