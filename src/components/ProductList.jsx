import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../App.css'
import { ToastContainer } from 'react-toastify';
import Navbar from './Navbar'
import Footer from './Footer';
import { fetchProducts } from '../features/ShopCart/productSlice';
import { addToCart } from '../features/ShopCart/cartSlice';

const ProductList = () => {
    const { items: products, status } = useSelector((state) => state.products);
    const dispatch = useDispatch();
    useEffect(() => {
        try {
            if (status === 'idle') {
                dispatch(fetchProducts())
            }
        } catch (error) {
            console.log("Error", error.response?.data?.message)
        }
    }, [status]);

    if (status === 'loading') return <p>Loading...</p>
    if (status === 'failed') return <p>Failed to fetch products</p>

    return (
        <>
            <Navbar />
            <div className='product-list'>
                {products.map((item) => (
                    <div key={item._id} className="product-card">
                        <img src={item.image} alt="{item.title}" />
                        <h2>{item.title}</h2>
                        <p>Price: ${item.price.toFixed(2)}</p>
                        <button onClick={() => dispatch(addToCart(item))}>Add to cart</button>
                    </div>
                ))}
            </div>
            <Footer />
            <ToastContainer position='top-left'/>
        </>

    )
}

export default ProductList