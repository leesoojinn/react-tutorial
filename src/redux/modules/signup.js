import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSignupSuccess: false,
  userEmail: "", // 사용자 이메일 정보를 저장
};

const signup = createSlice({
  name: "signup",
  initialState,
  reducers: {
    signupSuccess: (state, action) => {
      state.isSignupSuccess = true;
      // 회원가입 성공 시 사용자 이메일 정보 저장
      state.userEmail = action.payload;
    },
    // 로그아웃 기능
    logout: (state) => {
      state.isSignupSuccess = false;
      state.userEmail = null;
    },
  },
});

export const { signupSuccess, logout } = signup.actions;
export default signup.reducer;
