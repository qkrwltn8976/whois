import { createSetValueAction } from "./../../common/redux-helper";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { callApi } from "@/common/util/api";
import { User } from "@/types/User";

interface UserState {
  user: User | undefined;
  isFetching: boolean;
}
const initialState: UserState = {
  user: undefined,
  isFetching: false,
};

export const thunkFetchUser = createAsyncThunk(
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

export const thunkFetchUpdateUser = createAsyncThunk(
  "user/fetchUpdateUser",
  async ({
    type,
    user,
    key,
    value,
  }: {
    type: string;
    user: User;
    key: string;
    value: string;
  }) => {
    try {
      const oldValue: string = user[key];
      const { isSuccess, data } = await callApi({
        url: "/user/update",
        method: "post",
        data: { name: user.name, key, value, oldValue },
      });
      if (isSuccess && data) {
        return {
          ...user,
          [key]: value,
        };
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
    builder.addCase(thunkFetchUser.pending, (state, { payload }) => {
      state.isFetching = true;
    });
    builder.addCase(thunkFetchUser.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.isFetching = false;
    });
    builder.addCase(thunkFetchUpdateUser.fulfilled, (state, { payload }) => {
      state.user = payload;
    });
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
