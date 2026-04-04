import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const res = await axios.get("https://fakestoreapiserver.reactbd.org/api/products")
    return res.data.data
});


const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        status: 'idle'
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = "loading..."
        })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "succeded"
                state.items = action.payload
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.status = "failed"
            })
    }
});

export default productSlice.reducer;