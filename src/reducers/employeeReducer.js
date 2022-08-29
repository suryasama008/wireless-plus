import {
  START_EMPLOYEE_ACTION,
  AUTH_ERROR,
  EMPLOYEE_LOGIN_SUCCESS,
  ADD_EMPLOYEE_SUCCESS,
  EMPLOYEE_LOGOUT_SUCCESS,
} from "../actions/employeeActions";

const initialState = {
  isLoading: false,
  error: null,
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_EMPLOYEE_ACTION:
      return { ...state, error: null, isLoading: true };
    case EMPLOYEE_LOGIN_SUCCESS:
      return { ...state, error: null, isLoading: false };
    case EMPLOYEE_LOGOUT_SUCCESS:
      return { ...state, error: null, isLoading: false };
    case ADD_EMPLOYEE_SUCCESS:
      return { ...state, error: null, isLoading: false };
    default:
      return state;
  }
};

export default employeeReducer;
