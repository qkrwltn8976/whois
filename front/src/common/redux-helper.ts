import { RootState } from "@/store";

export const createSetValueAction = <T>(
  state: any,
  { payload: { name, value } }: { payload: { name: string; value: T } }
) => {
  state[name] = value;
};
