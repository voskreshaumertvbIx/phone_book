import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../components/auth/redux/authSlice";
import { contactSlice } from "./../components/contact/redux/contactSlice";

export default configureStore({
  reducer: {
    auth: userSlice.reducer,
    contact: contactSlice.reducer,
  },
});
