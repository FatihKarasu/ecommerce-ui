import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'


import type { AppState, AppThunk } from './store'

export interface CartState {
    cartItemId: string
    userId: string
    product: IProduct
    color: IColor
    size: ISize
    amount: number
}
export interface IProduct {
    productId: string
    productTitle: string
    productDetail: string
    productPrice: string
    productSalePrice: string
    productImage: string
}
export interface IColor {
    colorId: string
    colorValue: string
    colorName: string
}
export interface ISize {
    sizeId: string
    sizeName: string
}
export interface changeAmount {
    cartItemId: string
    amount: number
}
const initialState: CartState[] = []

export const cartReducer = createSlice({
    name: 'cart',
    initialState,

    reducers: {
        populateCart: (state, action: PayloadAction<CartState[]>) => {
            state = action.payload
            return state;
        },
        addToCart: (state, action: PayloadAction<CartState>) => {
            let add = true;
            state.forEach(element => {
                if (element.cartItemId == action.payload.cartItemId && element.color.colorId === action.payload.color.colorId && element.size.sizeId === action.payload.size.sizeId) {
                    element.amount = action.payload.amount;
                    add = false;
                }
            });
            if (add) {
                state.push(action.payload);
            }
           
        },
        deleteItem: (state, action: PayloadAction<string>) => {

            state = state.filter((item) => item.cartItemId !== action.payload)

            return state;
        },
        changeAmount: (state, action: PayloadAction<changeAmount>) => {

            state.forEach(element => {
                if (element.cartItemId == action.payload.cartItemId) {
                    element.amount = action.payload.amount;
                }
            });

            return state;
        },
        clearCart: (state) => {

            state = initialState
            return state
        },
    },


})

export const { populateCart, addToCart, deleteItem, changeAmount, clearCart } = cartReducer.actions


export const getCart = (state: AppState) => state.cart




export default cartReducer.reducer
