import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';
import mockData from '../utils/stackline_frontend_assessment_data_2021.json'; 
import { Product } from '../utils/types';

interface ProductState {
  productDetails: Product | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: ProductState = {
  productDetails: null,
  status: 'idle',
};

export const fetchProductDetails = createAsyncThunk(
  'product/fetchProductDetails',
  async (_, { rejectWithValue }) => {
    try {
      const productDetails = mockData[0];
      return productDetails;
    } catch (err) {
      return rejectWithValue('Failed to fetch product details');
    }
  }
);


const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.productDetails = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default productSlice.reducer;

export const selectProductDetails = (state: RootState) => state.product.productDetails;
