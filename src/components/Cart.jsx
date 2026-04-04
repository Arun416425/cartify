import { useEffect } from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { applyTempupdates, removeFromCart, updateTempquantity } from '../features/ShopCart/cartSlice'


const Cart = () => {
    const { items: cartItems, tempItems, totalPrice } = useSelector((state) => state.cart)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(cartItems)

    const handleRemoveItem = (id) => {
        dispatch(removeFromCart(id))
    };

    const handleUpdateQuantity = (id, quantity) => {
        dispatch(updateTempquantity({ id, quantity }))
    };

    const handleUpdate = () => {
        tempItems.forEach((item) => {
            dispatch(applyTempupdates(item._id))
        })
    }

    useEffect(() => {
        localStorage.setItem("Products", JSON.stringify(cartItems))
    }, [cartItems])

    return (
        <div className='wrapper'>
            <div className='cart-page-container'>
                {
                    cartItems.length === 0 ? (<div className='class-empty'>
                        <h3>Your Cart is empty...</h3>
                        <button onClick={() => navigate('/')} className="back-button">Back to home</button>
                    </div>) :

                        (
                            <div className="cart-container">
                                <h2>Your Cart</h2>
                                {cartItems.map((item) => (
                                    <div key={item._id} className='cart-item'>
                                        <img src={item.image} alt="Image" />
                                        <div className='cart-item-details'>
                                            <h3>{item.title}</h3>
                                            <p>Price: ${item.price.toFixed(2)}</p>
                                            <div>
                                                {/* <input type="number" min="1" value={tempItems.find((tempItem) => tempItem._id === item._id)?.quantity || item.quantity} onChange={(e) => handleUpdateQuantity(item._id, Number(e.target.value) || 1)} /> */}
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={tempItems.find((t) => t._id === item._id)?.quantity || item.quantity}
                                                    onChange={(e) => {
                                                        const val = parseInt(e.target.value);
                                                        handleUpdateQuantity(item._id, val);
                                                    }}
                                                />
                                                <button style={{ marginRight: "5px" }} onClick={handleUpdate} disabled={tempItems.length === 0}>
                                                    Update
                                                </button>
                                                <button onClick={() => handleRemoveItem(item._id)}>
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className='cart-total'>
                                    <p>Total: ${totalPrice.toFixed(2)}</p>
                                </div>
                                <div className="back-button" onClick={() => navigate('/')}>
                                    Back to shop
                                </div>
                            </div>
                        )
                }
            </div>
        </div >
    )
}

export default Cart