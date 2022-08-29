export const START_EMPLOYEE_ACTION = "START_EMPLOYEE_ACTION";
export const DELETE_EMPLOYEE_SUCCESS = "DELETE_EMPLOYEE_SUCCESS";
export const UPDATE_EMPLOYEE_SUCCESS = "UPDATE_PRODUCT_SUCCESS";
export const GET_PRODUCT_SUCCESS = "UPDATE_PRODUCT_SUCCESS";
export const EMPLOYEE_LOGIN_SUCCESS = "EMPLOYEE_LOGIN_SUCCESS";
export const ADD_EMPLOYEE_SUCCESS = "ADD_EMPLOYEE_SUCCESS";
export const EMPLOYEE_LOGOUT_SUCCESS = "EMPLOYEE_LOGOUT_SUCCESS";

export const ERROR = "ERROR";

export const createEmployee = (employee) => {
  return (dispatch, getState, { getFirestore }) => {
    dispatch({ type: START_EMPLOYEE_ACTION });
    const firestore = getFirestore();
    // const userId = getState().firebase.auth.uid;
    return firestore.collection("employees").add({
      ...employee,
      createdAt: new Date(),
    });
    // .then(() => {
    //   dispatch({ type: ADD_EMPLOYEE_SUCCESS });
    //   return true;
    // })
    // .catch((err) => {
    //   dispatch({ type: ERROR, payload: err.message });
    // });
  };
  console.log(employee);
};

export const removeProduct = (id) => {
  return (dispatch, getState, { getFirestore }) => {
    dispatch({ type: START_EMPLOYEE_ACTION });
    const firestore = getFirestore();
    return firestore
      .collection("products")
      .doc(id)
      .delete()
      .then(() => {
        dispatch({ type: DELETE_EMPLOYEE_SUCCESS });
        return true;
      })
      .catch((err) => {
        dispatch({ type: ERROR, payload: err.message });
      });
  };
};

export const updateProduct = (id, product) => {
  return (dispatch, getState, { getFirestore }) => {
    dispatch({ type: ADD_EMPLOYEE_SUCCESS });
    const firestore = getFirestore();
    return firestore
      .collection("products")
      .doc(id)
      .set({
        ...product,
      });
  };
};
