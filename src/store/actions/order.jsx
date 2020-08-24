import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const checkoutSuccess = (id, orderData) => {
  return {
    type: actionTypes.CHECKOUT_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const checkoutFail = (error) => {
  return {
    type: actionTypes.CHECKOUT_FAIL,
    error: error,
  };
};

export const submitOrderStart = () => {
  return {
    type: actionTypes.SUBMIT_ORDER_START,
  };
};

export const submitOrder = (orderData) => {
  return (dispatch) => {
    dispatch(submitOrderStart());
    axios
      .post("/orders.json", orderData)
      .then((response) => {
        console.log(response);
        dispatch(checkoutSuccess(response.data.name, orderData));
      })
      .catch((error) => {
        dispatch(checkoutFail(error));
      });
  };
};

export const afterCheckoutRedirect = () => {
  return {
    type: actionTypes.AFTER_CHECKOUT_REDIRECT,
  };
};
