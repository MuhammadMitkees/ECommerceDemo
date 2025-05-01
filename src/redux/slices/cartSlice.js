import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload;
      console.log("setCart called", state.items);
    },
  },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
