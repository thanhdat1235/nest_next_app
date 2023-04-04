import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userCreate: {
      username: "Noname",
    email: "test@gmail.com",
    password: "...",
    },
    userLogin: {
      id: "clfrqmas00000r6ffhtwxoyjr",
      username: "thanhdat",
      email: "thanhdat232k@gmail.com",
      role: "user",
      published: false,
      createdAt: "2023-03-28T04:07:58.225Z",
      updatedAt: "2023-03-31T01:46:16.442Z",
      refresh_token: ""
    }
  },
  reducers: {
    create: (state, action) => {
      (state.userCreate.username = action.payload.username),
        (state.userCreate.email = action.payload.email),
        (state.userCreate.password = action.payload.password);
    },

    setUser: (state, action) => {
      (state.userLogin.id = action.payload.id),
      (state.userLogin.username = action.payload.username),
        (state.userLogin.email = action.payload.email),
        (state.userLogin.published = action.payload.published),
        (state.userLogin.createdAt = action.payload.createdAt),
        (state.userLogin.updatedAt = action.payload.updatedAt),
        (state.userLogin.refresh_token = action.payload.refresh_token)
    }
  },
});

export const { create, setUser } = userSlice.actions;
export default userSlice.reducer;
