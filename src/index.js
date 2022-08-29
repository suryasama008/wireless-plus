import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { reduxFirestore, getFirestore } from "redux-firestore";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import rootReducer from "./reducers/rootReducer";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import firebaseConfig from "./config/firebaseConfig";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reactReduxFirebase(firebaseConfig, {
      userProfile: "users",
      useFirestoreForProfile: true,
      attachAuthIsReady: true,
    }),
    reduxFirestore(firebaseConfig)
  )
);

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

store.firebaseAuthIsReady.then(() => {
  root.render(
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  );
});

root.render(<App />);
