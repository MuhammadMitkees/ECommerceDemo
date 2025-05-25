import { createSlice } from "@reduxjs/toolkit";

// Get initial language from localStorage or default to "EN"
const getInitialLanguage = () => {
  return localStorage.getItem("lang") || "EN";
};

const languageSlice = createSlice({
  name: "language",
  initialState: {
    lang: getInitialLanguage(),
  },
  reducers: {
    setLanguage: (state, action) => {
      state.lang = action.payload;
      localStorage.setItem("lang", action.payload); // persist to localStorage
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
