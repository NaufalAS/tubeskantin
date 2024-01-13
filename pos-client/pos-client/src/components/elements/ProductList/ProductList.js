import React from "react";
import styles from './index.module.css'
import { useCart, useCartDispatch } from "@/context/CartContext";

const ProductList = ({ products }) => {
  const cartItems = useCart();
  const dispatch = useCartDispatch();

  const handleAddToCart = (product) => {
    const existingCartItem = cartItems.find((item) => item.id === product.id);

    if (existingCartItem) {
      // Check if adding one more will exceed the stock
      if (existingCartItem.quantity + 1 <= product.stock) {
        dispatch({
          type: 'add',
          payload: product,
        });
      }
    } else {
      dispatch({
        type: 'add',
        payload: { ...product, quantity: 1 },
      });
    }
  }

  return (
    <div className={styles['product-list']}>
      {products.map((product, index) => {
        const cartItem = cartItems.find((item) => item.id === product.id);
        const availableStock = product.stock - (cartItem?.quantity || 0);

        return (
          <div
            key={index}
            className={styles['product-list__product-card']}
          >
            <div className={styles['product-list__product-card__image']}>
              <img
                src={product.image}
                style={{ objectFit: 'cover' }}
                loading="lazy"
              />
            </div>
            <div className={styles['product-list__product-card__desc']}>
              <p>{product.nama}</p>
              {availableStock > 0 ? (
                <button onClick={() => handleAddToCart(product)}>+</button>
              ) : (
                <p>Stock Habis</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductList;
