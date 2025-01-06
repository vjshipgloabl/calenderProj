import { State, Action } from "./store";

export const rootReducer = (state: State, action: Action) => {
  console.log("Action:", action);

  switch (action.type) {
    case "ADD_EVENT":
      console.log("Adding event:", action.payload);
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    case "UPDATE_EVENT":
      const index = state.events.findIndex((e) => e.id === action.payload.id);
      state.events[index] = action.payload;
      return {
        ...state,
        events: state.events,
      };
    case "DELETE_EVENT":
      return {
        ...state,
        events: state.events.filter((e) => e.id !== action.payload),
      };
    default:
      return state;
  }
};
