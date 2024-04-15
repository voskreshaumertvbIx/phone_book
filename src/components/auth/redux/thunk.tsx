import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginParams } from "../types";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const fetchUser = createAsyncThunk<string, LoginParams>( //первый респонс второе реквест
  "user/fetchUser",
  async (data, thunkAPI) => {
    try {
      localStorage.setItem("email", data.email);
      await delay(2000);

      return data.email;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

