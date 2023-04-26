import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Genders } from "../../components/form-auth/gender.enum";

interface User {
  avatar: string;
  bio: string;
  birth: Date;
  color: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: Genders;
  role: string;
  userId: string;
}

interface AuthState {
  isAuth: boolean;
  sub: string;
  user?: User;
}

const initialState: AuthState = {
  isAuth: false,
  sub: "",
};

const localStorageTokenKey = "auth";

interface SetAuthGlobalPayload {
  token: string;
  sub: string;
}

interface SetUserPayload extends User {}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthGlobal: (state, action: PayloadAction<SetAuthGlobalPayload>) => {
      localStorage.setItem(
        localStorageTokenKey,
        JSON.stringify(action.payload)
      );

      state.isAuth = true;
      state.sub = action.payload.sub;
    },

    setAuth: (state) => {
      const auth = localStorage.getItem(localStorageTokenKey);
      if (!auth) return;

      const authParsed = JSON.parse(auth);
      if (authParsed?.token) {
        state.isAuth = true;
        state.sub = authParsed.sub;
      }
    },

    setUser: (state, action: PayloadAction<SetUserPayload>) => {
      state.user = action.payload;
    },

    resetAuthGlobal: (state) => {
      const auth = localStorage.getItem(localStorageTokenKey);
      if (!auth) return;

      localStorage.removeItem(localStorageTokenKey);

      state.isAuth = false;
      state.sub = "";
      state.user = undefined;
    },
  },
});

export const { setAuthGlobal, setAuth, setUser, resetAuthGlobal } =
  authSlice.actions;
export default authSlice.reducer;
