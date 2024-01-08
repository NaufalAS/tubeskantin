import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { useCart, useCartDispatch } from "@/context/CartContext";
import api from "@/api";
import Cookies from 'js-cookie';

const CartUser = () => {
  const [buyerName, setBuyerName] = useState("");
  const [displayedBuyerName, setDisplayedBuyerName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("online");
  const carts = useCart();
  const dispatch = useCartDispatch();
  const [changeAmount, setChangeAmount] = useState(0);

  // Retrieve user information from cookies
  const userInfo = Cookies.getJSON('userInfo');
  const { id } = userInfo || {};

  useEffect(() => {
    // Set the initial value of displayedBuyerName to user ID
    setDisplayedBuyerName(id || '');
  }, [id]);

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
      const totalPrice = +getTotalPrice();

      // Otomatis isi bayar sesuai dengan total harga
      const paidAmount = 0;
      const change = 0;

      const payload = {
        total_price: totalPrice,
        paid_amount: paidAmount,
        kembalian: change,
        products,
        pembeli: buyerName || id,
        status_pembayaran: "Belum Bayar",
        status_makanan: "Belum Siap",
        metode_pembayaran: paymentMethod,
      };
      await api.post("/transactions", payload);

      // Reset state
      setBuyerName("");
      setDisplayedBuyerName("");
      setPaymentMethod("online");
      dispatch({ type: "clear" });
    } catch (error) {
      console.error(error);
    }
  };

  const isDisableButton = () => {
    return (
      getTotalPrice() === 0 ||
      carts.length === 0
    );
  };

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
        {/* Hapus input bayar */}
        <div className={styles["cart__payment-method"]}>
          <label>Metode Pembayaran:</label>
          <select value={paymentMethod} onChange={handlePaymentMethodChange}>
            <option value="online">Online</option>
            <option value="bayar_tempat">Bayar Ditempat</option>
          </select>
        </div>
        {/* <div className={styles["cart__change"]}>
          <p>Kembalian:</p>
          <p>{changeAmount}</p>
        </div> */}
        <button onClick={handleCheckout} disabled={isDisableButton()}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartUser;
