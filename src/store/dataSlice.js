import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProductsSlice: [],
  featuredCategories: [],
  countMap: {},
  categoryProducts: {},
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setAllProductsSlice(state, action) {
      state.allProductsSlice = action.payload;
    },
    setFeaturedCategories(state, action) {
      state.featuredCategories = action.payload;
    },
    setCountMap(state, action) {
      state.countMap = action.payload;
    },
    setCategoryProducts(state, action) {
      const { category, products } = action.payload;
      state.categoryProducts[category] = products;
    },
  },
});

export const {
  setAllProductsSlice,
  setFeaturedCategories,
  setCountMap,
  setCategoryProducts,
} = dataSlice.actions;

export default dataSlice.reducer;
