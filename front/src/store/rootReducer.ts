import { combineReducers } from "@reduxjs/toolkit";
import searchReducer from "@/search/state";
import userReducer from "@/user/state";

const rootReducer = combineReducers({
  search: searchReducer,
  user: userReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
