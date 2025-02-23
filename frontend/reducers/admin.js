import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { token: null, etablissement: null, infoAdmin: {} },
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.etablissement = action.payload.etablissement;
      state.value.infoAdmin = action.payload.infoAdmin;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.etablissement = null;
      state.value.infoAdmin = {};
    },
    modify: (state, action) => {
      state.value.infoAdmin = action.payload;
    }
  }
});

export const { login, logout, modify } = adminSlice.actions;
export default adminSlice.reducer;
