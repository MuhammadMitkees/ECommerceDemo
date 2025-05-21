import { createSlice } from "@reduxjs/toolkit";

const initialLang = localStorage.getItem("lang") || "en";

const languageSlice = createSlice({
  name: "language",
  initialState: {
    lang: initialLang,
  },
  reducers: {
    setLanguage: (state, action) => {
      state.lang = action.payload;
      localStorage.setItem("lang", action.payload); // Persist
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
