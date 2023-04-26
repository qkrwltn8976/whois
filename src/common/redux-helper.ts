import { RootState } from "@/store";

export const createSetValueAction = (
  state: any,
  { payload: { name, value } }: { payload: { name: string; value: string } }
) => {
  state[name] = value;
};
