import React, { useState, useEffect } from 'react';
import Layout from "@/components/layouts/Layouts";
import api from '@/api';
import TransactionList from '@/components/elements/TransactionList/TransactionList';
import Layouts from '@/components/layouts/Layouts';

export default function Transaction() {
  
  const [transactionList, setTransactionList] = useState([])

  const fetchTransactions = async () => {
    try {
      const response = await api.get('/transactions');
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
    <Layouts>
      <h1> History</h1>
      <TransactionList transactionList={transactionList} />
    </Layouts>
  )
}
