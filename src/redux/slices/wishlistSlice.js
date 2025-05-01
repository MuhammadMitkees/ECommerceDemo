import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action) => {
      state.items = action.payload;
      console.log("setWishlist called", state.items);
    },
  },
});

export const { setWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
