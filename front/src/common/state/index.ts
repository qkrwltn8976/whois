import { createSetValueAction } from "./../../common/redux-helper";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { callApi } from "@/common/util/api";
import { User } from "@/types/User";

interface CommonState {
  fetchInfo: {};
}
const initialState: CommonState = {
  fetchInfo: {
    fetchStatusMap: {},
    isSlowMap: {},
    totalCountMap: {},
    errorMessageMap: {},
    nextPageMap: {},
  },
};

export const fetchcommon = createAsyncThunk(
  "common/fetchcommon",
  async (name: string, { rejectWithValue }) => {
    try {
      const { isSuccess, data } = await callApi({
        url: "/common/search",
        params: { keyword: name },
      });

      if (isSuccess && data) {
        // return data.find((item) => item.name === name);
      }
    } catch (err) {}
  }
);
const commonSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setValue: createSetValueAction,
  },
  extraReducers: (builder) => {
    // builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
    //   state.user = payload;
    // });
  },
});

export const commonActions = commonSlice.actions;
export default commonSlice.reducer;
