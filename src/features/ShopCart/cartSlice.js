import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const calTotal = (items) => items.reduce((sum, item) => sum + item.price * item.quantity, 0)

const savedItems = JSON.parse(localStorage.getItem("Products")) || []

const initialState = {
    items: savedItems, // Final items
    tempItems: [...savedItems],
    totalPrice: calTotal(savedItems)
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const existingItem = state.items.find((item) => item._id === action.payload._id)
            if (existingItem) {
                existingItem.quantity += 1
            } else {
                state.items.push({ ...action.payload, quantity: 1 })
            }
            state.tempItems = [...state.items]
            state.totalPrice = calTotal(state.items)
            toast.success("Product added to cart")
        },
        updateTempquantity(state, action) {
            const { id, quantity } = action.payload;
            const tempItem = state.tempItems.find(item => item._id === id);

            if (tempItem) {
                tempItem.quantity = Math.max(1, quantity);
            }
        },
        applyTempupdates(state, action) {
            const tempItem = state.tempItems.find((item) => item._id === action.payload)
            const cartItem = state.items.find((item) => item._id === action.payload)
            if (cartItem && tempItem) {
                cartItem.quantity = tempItem.quantity
            }
            state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        },
        removeFromCart(state, action) {
            state.items = state.items.filter(item => item._id !== action.payload)
            state.tempItems = [...state.items]
            // state.totalPrice = calTotal(state.items)
            state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        }
    }
});
export const { addToCart, removeFromCart, updateTempquantity, applyTempupdates } = cartSlice.actions
export default cartSlice.reducer