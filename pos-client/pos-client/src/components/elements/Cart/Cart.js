import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { useCart, useCartDispatch } from "@/context/CartContext";
import api from "@/api";

const Cart = () => {
  const [payAmount, setPayAmount] = useState("");
  const [buyerName, setBuyerName] = useState("0"); // Memberikan nilai default "0"
  const [paymentMethod, setPaymentMethod] = useState("online");
  const carts = useCart();
  const dispatch = useCartDispatch();
  const [changeAmount, setChangeAmount] = useState(0);

  const handleAddToCart = (product) => {
    dispatch({
      type: "add",
      payload: product,
    });
  };

  const getTotalPrice = () => {
    let totalPrice = 0;
    for (let i = 0; i < (carts ?? []).length; i++) {
      totalPrice += (carts[i]?.harga ?? 0) * (carts[i]?.quantity ?? 0);
    }
    return totalPrice;
  };

  const handleChangePay = (event) => {
    const { value } = event.target;
    setPayAmount(value);
  };

  const handleDecreaseCart = (product) => {
    dispatch({
      type: "decrease",
      payload: product,
    });
  };

  const handlePaymentMethodChange = (event) => {
    const { value } = event.target;
    setPaymentMethod(value);
  };

  const handleCheckout = async () => {
    const products = carts.map((item) => {
      return {
        id: item.id,
        quantity: item.quantity,
      };
    });
  
    try {
      const payload = {
        total_price: +getTotalPrice(),
        paid_amount: +payAmount,
        kembalian: +changeAmount,
        products,
        pembeli: buyerName, // Mengganti buyer_name menjadi pembeli
        status_pembayaran: "Sudah Dibayar",
        status_makanan: "Belum Siap",
        metode_pembayaran: paymentMethod, // Mengganti payment_method menjadi metode_pembayaran
      };
      await api.post("/transactions", payload);
      setPayAmount("");
      setBuyerName("0");
      setPaymentMethod("online");
      dispatch({ type: "clear" });
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleBuyerNameChange = (event) => {
    const { value } = event.target;
    setBuyerName(value);
  };
  

  const isDisableButton = () => {
    return (
      !payAmount ||
      +payAmount < +getTotalPrice() ||
      carts.length === 0
    );
  };

  useEffect(() => {
    const totalPrice = getTotalPrice();
    const paidAmount = +payAmount || 0;
    const change = paidAmount - totalPrice;
    setChangeAmount(change > 0 ? change : 0);
  }, [carts, payAmount]);

  return (
    <div className={styles.cart}>
      <h3>Cart</h3>

      <div className={styles["cart__cart-list"]}>
        {carts && carts.length > 0 ? (
          carts.map((cart, index) => (
            <div key={index} className={styles["cart-item"]}>
              <div className={styles["cart-item__image"]}>
                <img
                  src={cart.image}
                  alt={cart.nama}
                  width={50}
                  height={50}
                  objectFit="cover"
                />
              </div>
              <div className={styles["cart-item__desc"]}>
                <p>{cart.nama}</p>
                <p>{cart.harga}</p>
              </div>
              <div className={styles["cart-item__action"]}>
                <button onClick={() => handleDecreaseCart(cart)}>-</button>
                <p>{cart.quantity}</p>
                <button onClick={() => handleAddToCart(cart)}>+</button>
              </div>
            </div>
          ))
        ) : (
          <p>Keranjang Anda kosong.</p>
        )}
      </div>

      <div className={styles["cart__checkout"]}>
        <div className={styles["cart__total-price"]}>
          <p>Total Harga:</p>
          <p>{getTotalPrice()}</p>
        </div>
        <div className={styles["cart__pay"]}>
          <label>Bayar</label>
          <input
            placeholder="-"
            onChange={handleChangePay}
            type="number"
            value={payAmount}
            disabled={carts.length === 0}
          />
        </div>
        <div className={styles["cart__payment-method"]}>
          <label>Metode Pembayaran:</label>
          <select value={paymentMethod} onChange={handlePaymentMethodChange}>
            <option value="online">Online</option>
            <option value="bayar_tempat">Bayar Ditempat</option>
          </select>
        </div>
        <div className={styles["cart__change"]}>
          <p>Kembalian:</p>
          <p>{changeAmount}</p>
        </div>
        <button onClick={handleCheckout} disabled={isDisableButton()}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
