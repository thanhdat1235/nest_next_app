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
        avatar: "",
        createdAt: "",
        updatedAt: "",
        refresh_token: "",
      },
    ],
    userIsLogin: {
      id: "",
      username: "",
      email: "",
      password: "",
      role: "",
      published: "",      
      avatar: {
        id: "",
        userID: "",
        avatar_link: "", 
      },
      createdAt: "",
      updatedAt: "",
      refresh_token: "",
    },
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

    setUserLogin: (state, action) => {
      state.userIsLogin = action.payload;
    },
  },
});

export const { create, setUserActive, setUserLogin } = userSlice.actions;
export default userSlice.reducer;
