"use client";
const { createSlice } = require("@reduxjs/toolkit");

const detailsSlice = createSlice({
  name: "details",
  initialState: {
    tableList: [],
  },
  reducers: {
    setTableList: (state, action) => {
      const { data } = action.payload;
      state.tableList = data;
    },
  },
});

export const { setTableList } = detailsSlice.actions;

export default detailsSlice.reducer;
