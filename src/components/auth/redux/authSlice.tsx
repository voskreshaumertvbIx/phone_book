import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "./thunk";

const initialState = {
  user: null as string | null,
  isLoading: false,
  error: null as string | null,
  isLogged: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLogged = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isLogged = false;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isLogged = true;
        console.log("slicccccccer");
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message ?? "Unknown error";
        state.isLogged = false;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
