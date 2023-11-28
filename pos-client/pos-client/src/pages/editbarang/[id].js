// pages/editbarang/[id].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '@/api';

const EditBarang = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        const result = response.data.payload;

        if (response.status === 200) {
          setProduct(result);
        } else {
          console.error('Error fetching product details:', result);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductById();
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div>
      <h1>Edit Barang {id}</h1>
      <p>Nama Menu: {product.nama}</p>
      <p>Harga: {product.harga}</p>
      <p>Stok: {product.stock}</p>
      {/* Tambahkan formulir atau komponen edit di sini */}
    </div>
  );
};

export default EditBarang;
