import { create } from "zustand";
import { Event } from "./interfaace";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import { rootReducer } from "./reducer";

export interface State {
  events: Event[];
}

export interface Action {
  type: string;
  payload: any;
}

export const initialState: State = {
  events: [],
};

const myMiddlewares = (f: any) =>
  devtools(
    persist(f, {
      name: "app-storage",
      storage: createJSONStorage(() => sessionStorage),
    })
  );

export const useEventStore = create()(
  myMiddlewares((set: any) => ({
    ...initialState,
    dispatch: (action: Action) => {
      set((state: State) => rootReducer(state, action));
    },
  }))
);
