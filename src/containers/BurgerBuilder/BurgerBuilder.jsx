import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner.jsx";
import axios from "../../axios-orders.jsx";
// import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler.jsx";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 1.0,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
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

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceAddition;

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  checkOutHandler = () => {
    this.setState({ checkingOut: true });
  };

  checkoutContinueHandler = () => {
    //   // alert("You Continue!");
    //   this.setState({ showSpinner: true });
    //   const order = {
    //     ingredients: this.state.ingredients,
    //     price: this.state.totalPrice,
    //     customer: {
    //       name: "Sarah Fry",
    //       address: {
    //         street: "Test St.",
    //         zipCode: "99339",
    //         country: "United States",
    //       },
    //       email: "test@test.com",
    //     },
    //     deliveryMethod: "Same Day",
    //   };
    //   axios
    //     .post("/orders.json", order)
    //     .then((response) => {
    //       this.setState({ showSpinner: false, checkingOut: false });
    //     })
    //     .catch((error) =>
    //       this.setState({ showSpinner: false, checkingOut: false })
    //     );
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
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
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = (
      <OrderSummary
        ingredients={this.state.ingredients}
        total={this.state.totalPrice}
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
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchase={this.state.purchase}
          price={this.state.totalPrice}
          checkOut={this.checkOutHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
