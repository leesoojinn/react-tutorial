import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "../modules/signup";

const store = configureStore({
  reducer: {
    signup: signupReducer,
  },
});

export default store;
