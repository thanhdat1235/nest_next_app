import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "Noname",
    email: "test@gmail.com",
    password: "...",
  },
  reducers: {
    create: (state, action) => {
      (state.username = action.payload.username),
        (state.email = action.payload.email),
        (state.password = action.payload.password);
    },
  },
});

export const { create } = userSlice.actions;
export default userSlice.reducer;
