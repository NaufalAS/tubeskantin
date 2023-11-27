// import React from "react";
// import styles from './index.module.css';
// import { useCart, useCartDispatch } from "@/context/CartContext";

// const ProductList = ({ products }) => {
//     const dispatch = useCartDispatch();
//     const carts = useCart();

//     const handleAddToCart = (product) => {
//         dispatch({
//             type: 'add',
//             payload: product
//         });
//     }

//     const isProductInCart = (productId) => {
//         return carts && carts.some(item => item.id === productId);
//     }
    

//     return (
//         <div className={styles['product-list']}>
//             {products.map((product, index) => (
//                 <div key={index} className={styles['product-list__product-card']}>
//                     <div className={styles['product-list__product-card__image']}>
//                         <img
//                             src={product.image}
//                             style={{ objectFit: 'cover' }}
//                             loading="lazy"
//                         />
//                     </div>
//                     <div className={styles['product-list__product-card__desc']}>
//                         <div className={styles['product-list__product-card__desc__content']}>
//                             <p>{product.nama}</p>
//                             <button
//                                 onClick={() => handleAddToCart(product)}
//                                 disabled={isProductInCart(product.id)}
//                             >
//                                 {isProductInCart(product.id) ? 'In Cart' : '+'}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default ProductList;


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
                    <div className={styles['product-list__product-card__image__desc']}>
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