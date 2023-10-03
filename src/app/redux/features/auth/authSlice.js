"use client";
const { default: TokenService } = require("@/utils/Token.service");
const { createSlice, createAction } = require("@reduxjs/toolkit");

const updateSetCredentials = createAction("auth/updateSetCredentials");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userName: TokenService.getUser(),
    userId: TokenService.getUserId(),
    token: TokenService.getToken(),
    accessToken: TokenService.getAccessToken(),
  },
  reducers: {
    setCredentials: (state, action) => {
      const { data } = action.payload;

      state.userName =
        data.firstName + " " + data.middleName + " " + data.lastName;
      state.userId = data.userName;
      state.token = data.userToken;
      TokenService.updateLocalToken(state.userName, state.userId, state.token);
    },
    logOut: (state, action) => {
      state.userName = null;
      state.userId = null;
      state.token = null;
      TokenService.removeUser();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateSetCredentials, (state, action) => {
      if (action.payload.response) {
        state.accessToken = action.payload.response;
        TokenService.updateLocalAccessToken(state.accessToken);
      }
    });
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export { updateSetCredentials };

export default authSlice.reducer;

export const selectCurrentUser = (state) => {
  if (state?.userName) return state.userName;

  return null;
};

export const selectCurrentUserId = (state) => {
  if (state?.userId) return state.userId;

  return null;
};

export const selectRefreshToken = (state) => {
  if (state?.token) return state.token;

  return null;
};
export const selectAccessToken = (state) => {
  if (state?.accessToken) return state.accessToken;

  return null;
};
