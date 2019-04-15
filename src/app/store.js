/* global window */
import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/es/storage";
import thunk from "redux-thunk";
import reducers from "@app/reducers";

const config = {
  key: "root",
  storage,
  blacklist: ["status"]
};

const reducer = persistCombineReducers(config, reducers);

const middleware = [thunk];

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;



const configureStore = () => {
  const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(...middleware)),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  const persistor = persistStore(store, null, () => {
    store.getState();
  });

  return { persistor, store };
};

export default configureStore;
