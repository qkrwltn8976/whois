import { createSetValueAction } from "./../../common/redux-helper";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { callApi } from "@/common/util/api";
import { User } from "@/types/User";

interface UserState {
  user: User | undefined;
}
const initialState: UserState = {
  user: undefined,
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (name: string, { rejectWithValue }) => {
    try {
      const { isSuccess, data } = await callApi({
        url: "/user/search",
        params: { keyword: name },
      });

      if (isSuccess && data) {
        return data.find((item: User) => item.name === name);
      }
    } catch (err) {}
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setValue: createSetValueAction,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
      state.user = payload;
    });
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
