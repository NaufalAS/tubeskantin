import React from "react";
import styles from './index.module.css'
import { useCartDispatch } from "@/context/CartContext";


const ProductList = ({products}) =>{
    const dispatch = useCartDispatch();
    const handleAddToCart = product =>{
       dispatch({
        type :'add',
        payload : product
       })
    }

    // console.log(products)
    return(
        <div className={styles['product-list']}>
        {products.map((product, index) => {
            return (
                <div 
                key={index}
                className={styles['product-list__product-card']}>
                    <div className={styles['product-list__product-card__image']}>
                    <img
                           src={product.image}
                            style={{ objectFit: 'cover' }}
                             loading="lazy"
                         />
                    </div>
                    <div className={styles['product-list__product-card__desc']}>
    <p>{product.nama}</p>
    <button onClick={() => handleAddToCart(product)}>+</button>
</div>
                </div>
            )
          })}
        </div>
    )
}

export default ProductList;