import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cartSlice, counterSlice } from "./slice";
import { estackApi, pokemonApi } from "./services";
import { setupListeners } from "@reduxjs/toolkit/query";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "primary",
  storage,
  whitelist: ["cartSlice", "cart"],
};

const rootReducer = combineReducers({
  cart: cartSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () =>
  configureStore({
    reducer: {
      counter: counterSlice.reducer,
      persistedReducer,
      [pokemonApi.reducerPath]: pokemonApi.reducer,
      [estackApi.reducerPath]: estackApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      })
        .concat(pokemonApi.middleware)
        .concat(estackApi.middleware);
    },
  });

export const persistor = persistStore(makeStore());
setupListeners(makeStore);
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
