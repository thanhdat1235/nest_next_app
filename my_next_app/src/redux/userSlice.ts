import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userCreate: {
      username: "Noname",
      email: "test@gmail.com",
      password: "...",
    },
    userActive: [
      {
        id: "",
        username: "",
        email: "",
        password: "",
        role: "",
        published: "",
        createdAt: "",
        updatedAt: "",
        refresh_token: "",
      },
    ],
  },
  reducers: {
    create: (state, action) => {
      (state.userCreate.username = action.payload.username),
        (state.userCreate.email = action.payload.email),
        (state.userCreate.password = action.payload.password);
    },

    setUserActive: (state, action) => {
      state.userActive = action.payload;
    },
  },
});

export const { create, setUserActive } = userSlice.actions;
export default userSlice.reducer;
