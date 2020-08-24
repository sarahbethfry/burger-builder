import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,
  redirect: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AFTER_CHECKOUT_REDIRECT:
      return {
        ...state,
        redirect: false,
      };
    case actionTypes.SUBMIT_ORDER_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.CHECKOUT_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId,
      };
      return {
        ...state,
        loading: false,
        redirect: true,
        orders: state.orders.concat(newOrder),
      };
    case actionTypes.CHECKOUT_FAIL:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default reducer;
