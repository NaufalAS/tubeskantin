
import React, { useState, useEffect } from 'react';
import styles from './index.module.css';

const updateTransactionStatus = async (id, data, apiEndpoint) => {
  try {
    const response = await fetch(apiEndpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        ...data,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update transaction status');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error updating transaction status:', error);
    throw new Error('Error updating transaction status');
  }
};
const PesananUser = ({ transactionList, onUpdateStatus }) => {
  const [transactions, setTransactions] = useState(transactionList);

  const updateTransactionStatusApi = async (id, data, apiEndpoint) => {
    try {
      const response = await fetch(apiEndpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          ...data,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update transaction status');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error updating transaction status:', error);
      throw new Error('Error updating transaction status');
    }
  };

  const handleStatusUpdate = async (transaction, newStatus) => {
    try {
      let updatedData = {};
      let apiEndpoint = '';

      if (newStatus === 'Sudah Dimakan') {
        updatedData = { status_makanan: newStatus };
        apiEndpoint = `http://localhost:3000/transactions/${transaction.no_order}/edit`;
      } else if (newStatus === 'Sudah Dibayar') {
        updatedData = { status_pembayaran: newStatus };
        apiEndpoint = `http://localhost:3000/transactions/${transaction.no_order}/edit1`;
      }

      await updateTransactionStatusApi(transaction.id, updatedData, apiEndpoint);

      // Update the state to trigger a re-render
      setTransactions((prevTransactions) => {
        const updatedTransactions = prevTransactions.map((prevTransaction) => {
          if (prevTransaction.id === transaction.id) {
            return { ...prevTransaction, ...updatedData };
          }
          return prevTransaction;
        });
        return updatedTransactions;
      });

      // Call onUpdateStatus if it's a function
      if (typeof onUpdateStatus === 'function') {
        onUpdateStatus();
      }
    } catch (error) {
      console.error('Error updating transaction status:', error);
    }
  };

  useEffect(() => {
    // Update the component state when transactionList prop changes
    setTransactions(transactionList);
  }, [transactionList]);

  const filteredOrders = transactions.filter(
    (transaction) =>
      transaction.status_makanan === 'Belum Siap' ||
      transaction.status_pembayaran === 'Belum Bayar' ||
      (transaction.status_makanan === 'Sudah Dimakan' && transaction.status_pembayaran === 'Belum Bayar')
  );

  return (
    
    <div className={styles['transaction-list']}>
      {filteredOrders.map((transaction, index) => (
        <div key={index} className={styles['transaction-list__card']}>
          <h3>{transaction.no_order}</h3>
          {/* ... Other transaction details ... */}
          <div className={styles['transaction-list__card__status']}>
            <p>Status Makanan: {transaction.status_makanan}</p>
            <p>Pembayaran: {transaction.status_pembayaran}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PesananUser;
