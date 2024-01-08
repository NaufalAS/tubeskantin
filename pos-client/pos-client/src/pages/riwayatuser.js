import React, { useState, useEffect } from 'react';
import Layout from "@/components/layouts/Layout";
import api from '@/api';
import TransactionUser from '@/components/elements/TransactionUser/TransactionUser';
import Cookies from 'js-cookie';

export default function Transaction() {

  const userInfo = Cookies.getJSON('userInfo');
  const { id } = userInfo || {};
  
  const [transactionList, setTransactionList] = useState([])

  const fetchTransactions = async () => {
    try {
      const response = await api.get(`/transactions/byBuyer/${id}`);
      const data = response.data.payload.transactions
      setTransactionList(data)
    } catch (err) {
      throw Error(err)
    }
  }

  const handleUpdateStatus = () => {
    fetchTransactions();
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <Layout>
      <h1>Transaction History user</h1>
      <TransactionUser transactionList={transactionList} />
    </Layout>
  )
}
