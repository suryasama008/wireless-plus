import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import employeeReducer from "./employeeReducer";
import authReducer from "./authReducer";
import productReducer from "./productReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  employees: employeeReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
