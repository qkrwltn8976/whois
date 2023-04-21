export function createReducer(initialState, handlerMap) {
  return function (state = initialState, action) {
    const handler = handlerMap[action.type];
    if (handler) {
      return () => {
        const handler = handlerMap[action.type];
        handler(state, action);
      };
    }
  };
}

export function createSetValueAction(type: string) {
  return (key: string, value) => ({ type, key, value });
}

// export function setValueReducer(state, action) {
//   state[action.key] = action.value;
// }

export const setValueReducer = (state: any, { payload: { name, value } }) => ({
  ...state,
  [name]: {
    ...state[name],
    value,
  },
});
