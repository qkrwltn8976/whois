import { createSetValueAction } from "./../../common/redux-helper";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { callApi } from "@/common/util/api";
import { User } from "@/types/User";

interface SearchState {
  keyword: string;
  autoCompletes: User[];
}
const initialState: SearchState = {
  keyword: "",
  autoCompletes: [],
};

export const fetchAutoComplete = createAsyncThunk(
  "search/autoComplete",
  async (keyword: string, { rejectWithValue }) => {
    try {
      const { isSuccess, data } = await callApi({
        url: "/user/search",
        params: { keyword },
      });

      if (isSuccess && data) {
        return data;
      }
    } catch (err) {}
  }
);
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setValue: createSetValueAction,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAutoComplete.fulfilled, (state, { payload }) => {
      state.autoCompletes = payload;
    });
  },
});

export const searchActions = searchSlice.actions;
export default searchSlice.reducer;
