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

export const submitOrder = (orderData, token) => {
  return (dispatch) => {
    dispatch(submitOrderStart());
    axios
      .post("/orders.json?auth=" + token, orderData)
      .then((response) => {
        console.log(orderData, response);
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

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error,
  };
};

export const fetchOrders = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    const queryParams =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios.get("/orders.json" + queryParams).then((res) => {
      console.log(res);
      const fetchedOrders = [];
      for (let key in res.data) {
        fetchedOrders.push({ ...res.data[key], id: key });
      }
      dispatch(fetchOrdersSuccess(fetchedOrders));
    });
  };
};
