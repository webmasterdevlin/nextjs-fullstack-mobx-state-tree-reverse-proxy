import { useContext, createContext } from "react";
import { types, Instance, onSnapshot } from "mobx-state-tree";
import makeInspectable from "mobx-devtools-mst";

import { PostStore } from "src/features/posts/postStore";

const RootModel = types.model({
  postStore: PostStore,
});

let initialState = RootModel.create({
  postStore: {
    posts: [],
    post: { id: 0, userId: 0, title: "", body: "" },
    loading: false,
  },
});

if (typeof window !== "undefined") {
  const data = localStorage.getItem("rootState");
  if (data) {
    const json = JSON.parse(data);
    if (RootModel.is(json)) {
      initialState = RootModel.create(json as any);
    }
  }
}

export const rootStore = initialState;

if (typeof window !== "undefined") {
  onSnapshot(rootStore, (snapshot) => {
    localStorage.setItem("rootState", JSON.stringify(snapshot));
  });
}

export type RootInstance = Instance<typeof RootModel>;

const RootStoreContext = createContext<null | RootInstance>(null);

export const Provider = RootStoreContext.Provider;

export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null)
    throw new Error("Store cannot be null, please add a context provider");

  makeInspectable(store);
  return store;
}
