import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  status: false,
  userData: null,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
      state.loading = false;
      state.error = null;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const { login, logout, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;