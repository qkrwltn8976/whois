import { RootState } from ".";
import { createSetValueAction } from "./../../common/redux-helper";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { callApi } from "@/common/util/api";
import { User } from "@/types/User";

interface SearchEntity {
  name: string;
  department: string;
  tag: string;
}
interface SearchState {
  keyword: string;
  autoCompletes: SearchEntity[];
}
const initialState: SearchState = {
  keyword: "",
  autoCompletes: [],
};

export const thunkFetchAutoComplete = createAsyncThunk(
  "search/fetchAutoComplete",
  async (keyword: string) => {
    const { isSuccess, data } = await callApi<SearchEntity[]>({
      method: "get",
      url: "/user/search",
      params: { keyword },
    });

    if (isSuccess && data) {
      return data;
    } else {
      return [] as SearchEntity[];
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setValue: createSetValueAction,
    setKeyword(state, { payload: keyword }: PayloadAction<string>) {
      state.keyword = keyword;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      thunkFetchAutoComplete.fulfilled,
      (state, { payload: searchEntities }) => {
        state.autoCompletes = searchEntities;
      }
    );
  },
});

export const searchActions = searchSlice.actions;

/**
 * export const {setKeyword} = searchSlice.actions;
 */
export const selectKeyword = (state: RootState): string => state.search.keyword;
export const selectAutoCompletes = (state: RootState): SearchEntity[] =>
  state.search.autoCompletes;

export default searchSlice.reducer;
