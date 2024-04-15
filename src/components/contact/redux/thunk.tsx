import { createAsyncThunk } from "@reduxjs/toolkit";
import { ContactInfo } from "../types";

export const fetchContact = createAsyncThunk<ContactInfo[], void>(
  "contacts/fetchContacts",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("db.json");

      const data = await response.json();
      return data.dbUsers;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
