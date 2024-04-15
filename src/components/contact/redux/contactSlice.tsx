import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchContact } from "./thunk";
import { ContactInfo } from "../types";

const initialState = {
  contact: [] as ContactInfo[],
  loading: false,
  error: null as string | null,
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    addContact(state, action: PayloadAction<ContactInfo>) {
      state.contact.push(action.payload);
    },
    updateContact(state, action: PayloadAction<ContactInfo>) {
      const updatedContact = action.payload;
      const index = state.contact.findIndex(
        (c: ContactInfo) => c.id === updatedContact.id
      );
      if (index !== -1) {
        state.contact[index] = updatedContact;
      }
    },
    deleteContact(state, action: PayloadAction<string>) {
      state.contact = state.contact.filter(
        (contact) => contact.id !== action.payload
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contact = action.payload;
      })
      .addCase(fetchContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message ?? "Unknown error";
      });
  },
});

export const { addContact, updateContact, deleteContact } =
  contactSlice.actions;
export default contactSlice.reducer;
