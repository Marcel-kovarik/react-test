import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items:[]
    },
    reducers: {
        addProduct: (state, action) => {
            const found = state.items.find(ele => ele.productId === action.payload);
            if(!found){
                state.items.push({
                    productId: action.payload,
                    discount:0,
                    count: 1
                }) 
            } else {
                state.items = state.items.map(obj => {
                    if (obj.productId === action.payload) {
                        obj.count += 1
                    }
                    return obj
                })
            }
        },
        removeProduct: (state, action) => {
            state.items = state.items.filter(obj => obj.productId !== action.payload)                
        },
        updateQuantity: (state, action) => {
            if(action.payload.status === 'add'){
                state.items = state.items.map(obj => {
                    if (obj.productId === action.payload.productId) {
                        obj.count += 1
                    }
                    return obj
                })                
            } 
            if(action.payload.status === 'remove'){
                state.items = state.items.map(obj => {
                    if (obj.productId === action.payload.productId) {
                        if(obj.count === 1) obj.count = 1; else obj.count -= 1;
                    }
                    return obj
                })                
            } 
        },
        applyVoucher: (state, action) => {
            state.items = state.items.map(obj => {
                if (obj.productId === action.payload.productId) {
                    obj.discount = action.payload.discount;
                }
                return obj
            })                
        },
        
        productsPurchased: (state, action) => {
            state.items = [];
        },
    },
});

export const {
    addProduct,
    removeProduct,
    updateQuantity,
    applyVoucher,
    productsPurchased,
} = cartSlice.actions;

export default cartSlice.reducer;
