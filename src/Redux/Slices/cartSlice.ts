import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../Store";
import { GetCartFromLs } from "../../utils/GetCartFromLs";
import { calcTotalPrice } from "../../utils/CalcTotalPrice";

export type CartItem = {
    id: string,
    title: string,
    price: number, 
    imageUrl: string,
    type: string,
    count: number,
};

interface CartSliceState {
    totalPrice: number,
    items: CartItem[]
}

const {items, totalPrice} = GetCartFromLs()

const initialState: CartSliceState = {
    totalPrice,
    items
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItems(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            if(findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                })
            }
            state.totalPrice = calcTotalPrice(state.items)
        }, 
        minusItems(state, action: PayloadAction<string>) {
            const findItem = state.items.find(obj => obj.id === action.payload)
            if (findItem) {
                findItem.count--
            }
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum;
            }, 0);
        },
        removeItems(state, action: PayloadAction<string>) {
            state.items = state.items.filter((obj) => obj.id !== action.payload);
        },
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
        },
    }
})

export const selectCart = (state: RootState) => state.cart;
export const selectCartitemById = (id: string) => (state: RootState) => state.cart.items.find(obj => obj.id === id)

export const { addItems, removeItems, clearItems, minusItems } = cartSlice.actions;

export default cartSlice.reducer;