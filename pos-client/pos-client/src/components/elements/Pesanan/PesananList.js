import React, { useState, useEffect } from 'react';
import styles from './index.module.css';
// ... (kode sebelumnya)

const PesananList = ({ transactionList, onUpdateStatus }) => {
  const [transactions, setTransactions] = useState(transactionList);
  const [amountPaidMap, setAmountPaidMap] = useState({});

  // Fungsi untuk memperbarui status transaksi
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

  // Fungsi untuk menangani perubahan jumlah pembayaran
  const handleAmountPaidChange = (event, noOrder) => {
    const paidAmount = parseFloat(event.target.value) || 0;

    // Update the payment amount map for the specific transaction
    setAmountPaidMap((prevAmountPaidMap) => ({
      ...prevAmountPaidMap,
      [noOrder]: paidAmount,
    }));
  };

  // Fungsi untuk menangani pembaruan status
// Fungsi untuk menangani pembaruan status
const handleStatusUpdate = async (transaction, newStatus) => {
  try {
    let updatedData = {};
    let apiEndpoint = '';

    if (newStatus === 'Sudah Dimakan') {
      updatedData = { status_makanan: newStatus };
      apiEndpoint = `http://localhost:3000/transactions/${transaction.no_order}/edit`;
    } else if (newStatus === 'Sudah Dibayar') {
      // Include paid_amount and kembalian in the updatedData object
      updatedData = {
        status_pembayaran: newStatus,
        paid_amount: amountPaidMap[transaction.no_order] || 0,
        kembalian: amountPaidMap[transaction.no_order] - transaction.total_price || 0,
      };
      apiEndpoint = `http://localhost:3000/transactions/${transaction.no_order}/edit1`;
    }

    await updateTransactionStatusApi(transaction.no_order, updatedData, apiEndpoint);

    // Update the state to trigger a re-render
    setTransactions((prevTransactions) => {
      const updatedTransactions = prevTransactions.map((prevTransaction) => {
        if (prevTransaction.no_order === transaction.no_order) {
          return { ...prevTransaction, ...updatedData };
        }
        return prevTransaction;
      });
      return updatedTransactions;
    });

    // Update amountPaidMap using no_order
    setAmountPaidMap((prevAmountPaidMap) => ({
      ...prevAmountPaidMap,
      [transaction.no_order]: amountPaidMap[transaction.no_order] || 0,
    }));

    // Call onUpdateStatus if it's a function
    if (typeof onUpdateStatus === 'function') {
      onUpdateStatus();
    }
  } catch (error) {
    console.error('Error updating transaction status:', error);
  }
};


  // Fungsi untuk menangani pembaruan state saat prop transactionList berubah
  useEffect(() => {
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
          <div className={styles['transaction-list__card__product-list']}>
            {transaction.products.map((product, indexProduct) => (
              <div key={indexProduct}>
                <p>Nama Barang: {product.product}</p>
                <p>Kuantitas: {product.quantity}</p>
              </div>
            ))}
          </div>
          <div className={styles['transaction-list__card__status']}>
            <p>Status Makanan: {transaction.status_makanan}</p>
            <p>Status Makanan: {transaction.metode_pembayaran}</p>
            <p>Pembayaran: {transaction.status_pembayaran}</p>
            <p>Total Harga: {transaction.total_price}</p>
            <div>
              <label htmlFor={`amountPaid_${transaction.no_order}`}>Input Bayar:</label>
              <input
                type="number"
                id={`amountPaid_${transaction.no_order}`}
                value={amountPaidMap[transaction.no_order] || 0}
                onChange={(event) => handleAmountPaidChange(event, transaction.no_order)}
              />
            </div>
            <p>Total Bayar: {amountPaidMap[transaction.no_order] || 0}</p>
            <p>Kembalian: {amountPaidMap[transaction.no_order] - transaction.total_price}</p>
            <button onClick={() => handleStatusUpdate(transaction, 'Sudah Dimakan')}>
              Set Sudah Dimakan
            </button>
            <button onClick={() => handleStatusUpdate(transaction, 'Sudah Dibayar')}>
              Set Sudah Dibayar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PesananList;