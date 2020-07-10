import { createStore, applyMiddleware } from "redux";
import { AsyncStorage } from "react-native";
import { persistStore, persistCombineReducers } from "redux-persist";
import thunk from "redux-thunk";
import logger from "redux-logger";

import { taskReducer } from "./reducers/taskReducer";

const config = {
  key: "root",
  storage: AsyncStorage,
  debug: true,
};

export const ConfigureStore = () => {
  const store = createStore(
    persistCombineReducers(config, { tasks: taskReducer }),
    applyMiddleware(thunk, logger)
  );
  const persistor = persistStore(store);

  return { store, persistor };
};