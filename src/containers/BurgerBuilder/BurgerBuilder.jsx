import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner.jsx";
import * as actionTypes from "../../store/actions.jsx";
// import axios from "../../axios-orders";

// import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler.jsx";

class BurgerBuilder extends Component {
  state = {
    purchase: false,
    checkingOut: false,
    showSpinner: false,
  };

  componentDidMount() {
    console.log(this.props);
  }
  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({ purchase: sum > 0 });
  };

  checkOutHandler = () => {
    this.setState({ checkingOut: true });
  };

  checkoutContinueHandler = () => {
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push("price=" + this.state.totalPrice);
    const queryString = queryParams.join("&");

    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };

  modalClosed = () => {
    this.setState({ checkingOut: false });
  };

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = (
      <OrderSummary
        ingredients={this.props.ings}
        total={this.props.price}
        close={this.modalClosed}
        continue={this.checkoutContinueHandler}
      />
    );
    if (this.state.showSpinner) {
      orderSummary = <Spinner />;
    }
    return (
      <Aux>
        <Modal show={this.state.checkingOut} close={this.modalClosed}>
          {orderSummary}
        </Modal>
        <Burger ingredients={this.props.ings} />
        <BuildControls
          ingredientAdded={this.props.addedIngredient}
          ingredientRemoved={this.props.removedIngredient}
          disabled={disabledInfo}
          purchase={this.state.purchase}
          price={this.props.price}
          checkOut={this.checkOutHandler}
        />
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addedIngredient: (ingName) =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    removedIngredient: (ingName) =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
