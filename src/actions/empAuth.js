export const START_EMPLOYEE_ACTION = "START_EMPLOYEE_ACTION";
export const DELETE_EMPLOYEE_SUCCESS = "DELETE_EMPLOYEE_SUCCESS";
export const UPDATE_EMPLOYEE_SUCCESS = "UPDATE_PRODUCT_SUCCESS";
export const GET_PRODUCT_SUCCESS = "UPDATE_PRODUCT_SUCCESS";
export const EMPLOYEE_LOGIN_SUCCESS = "EMPLOYEE_LOGIN_SUCCESS";
export const ADD_EMPLOYEE_SUCCESS = "ADD_EMPLOYEE_SUCCESS";

export const empSignIn = (loginSuccess) => {
  return (dispatch) => {
    dispatch({ type: START_EMPLOYEE_ACTION });
    // return loginSuccess && dispatch({ type: EMPLOYEE_LOGIN_SUCCESS });
    // console.log(loginSuccess);
  };
};
