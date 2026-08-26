import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProductsSlice: [],
  featuredCategories: [],
  countMap: {},
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
  },
});

export const { setAllProductsSlice, setFeaturedCategories, setCountMap } =
  dataSlice.actions;

export default dataSlice.reducer;
