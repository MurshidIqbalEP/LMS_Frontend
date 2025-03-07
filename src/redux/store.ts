import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import educatorSlice from "./slices/educatorSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

// ✅ Ensure imports come first
const rootReducer = combineReducers({
  auth: authSlice,
  educator: educatorSlice,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ✅ Avoid Redux Persist serialization warnings
    }),
});

export const persistor = persistStore(store);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
