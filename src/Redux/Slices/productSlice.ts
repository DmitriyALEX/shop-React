import { createSlice, createAsyncThunk, PayloadAction, } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../Store";

export type SearchProductParams = {
    search: string,
    order: string, 
    sortBy: string, 
    category: string, 
    currentPage: number,
};

export const fetchProduct = createAsyncThunk<Product[], SearchProductParams>('product/fetchProductStatus',
    async (params) => {
        const { order, sortBy, category, currentPage, search } = params;
        const { data } = await axios.get(
            `https://64465a990431e885f00fab2d.mockapi.io/data?page=${currentPage}&limit=5&${category}&sortBy=${sortBy}&order=${order}&search=${search}`
            );
      return data;  
    });

    type Product = {
        id: string, 
        title: string,
        price: number,
        imageUrl: string,
        type: number[], 
        size: number[], 
    };

    export enum Status {
        LOADING = 'loading',
        SUCCESS = 'success',
        ERROR = 'error'
    };

    interface ProductSliceState {
        items: Product[];
        status: Status;
    };

const initialState: ProductSliceState = {
    items: [],
    status: Status.LOADING,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Product[]>) {
            state.items = action.payload;
        }, 
    },
     extraReducers: (builder) => {
        builder
       .addCase(fetchProduct.pending, (state) => {
            state.status = Status.LOADING;
            state.items = [];
        })
       .addCase(fetchProduct.fulfilled, (state, action) => {
            state.status = Status.SUCCESS;
            state.items = action.payload;
        })
        .addCase(fetchProduct.rejected, (state) => {
            state.status = Status.ERROR;
            state.items = [];
        })
    }
})

    export const selectProductItems = (state: RootState) => state.product 
    export const {  setItems } = productSlice.actions;

    export default productSlice.reducer;