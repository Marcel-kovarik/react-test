import products from '../data/products.json';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        try {
          return products;
        } catch(err) {
          console.log(err);
        }
    }
);

export const fetchVouchers = createAsyncThunk(
    'products/fetchVouchers',
    async () => {}
);

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: []
    },
    extraReducers: {
        [fetchProducts.fulfilled]: (state, action) => {
            state.products = action.payload;
        }
    },
});

export default productsSlice.reducer;
