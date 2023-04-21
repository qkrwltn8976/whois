import {
  createSetValueAction,
  setValueReducer,
} from "./../../common/redux-helper";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { callApi } from "@/common/util/api";

interface SearchState {
  keyword: string;
  autoComplete: string[];
}
const initialState: SearchState = {
  keyword: "",
  autoComplete: [],
};

export const fetchAutoComplete = createAsyncThunk(
  "search/autoComplete",
  async ({ keyword }: { keyword: string }, { rejectWithValue }) => {
    try {
      const { isSuccess, data } = await callApi({
        url: "/user/search",
        params: { keyword },
      });

      if (isSuccess && data) {
        return data;
      }
    } catch (err) {
      //   return rejectWithValue(err?.response?.status);
    }
  }
);
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    // setValue: createSetValueAction,
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAutoComplete.fulfilled,
      (state, { payload: keyword }) => {
        if (keyword) {
          state.keyword = keyword;
        }
      }
    );
  },
});

export const searchActions = searchSlice.actions;
export default searchSlice.reducer;
