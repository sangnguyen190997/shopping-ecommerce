import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import userReducer from "./userSlice";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import checkoutReducer from "./checkoutSlice";
import commentReducer from "./commentSlice";
import messengerReducer from "./messengerSlice";
import historyReducer from "./historySlice";

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
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  product: productReducer,
  user: userReducer,
  auth: authReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  comment: commentReducer,
  messenger: messengerReducer,
  history: historyReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);

// const store = configureStore({
//   reducer: {
//     product: productReducer,
//     user: userReducer,
//     auth: authReducer,
//   },
// });

// export default store;
