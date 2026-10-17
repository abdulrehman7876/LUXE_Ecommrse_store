import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProductsSlice: [],
  featuredCategories: [],
  catalogLoading: true,
  catalogError: null,
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
    setCatalogStatus(state, action) {
      state.catalogLoading = action.payload.loading;
      state.catalogError = action.payload.error ?? null;
    },
  },
});

export const {
  setAllProductsSlice,
  setFeaturedCategories,
  setCatalogStatus,
} = dataSlice.actions;

export default dataSlice.reducer;
