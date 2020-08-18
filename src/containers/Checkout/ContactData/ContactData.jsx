import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";
import classes from "./ContactData.css";
import Forms from "../../../components/UI/Forms/Forms";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email",
        },
        value: "",
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Street",
        },
        value: "",
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Zip",
        },
        value: "",
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "",
      },
    },
    checkingOut: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ checkingOut: true });
    const formData = {};
    for (let formInput in this.state.orderForm) {
      formData[formInput] = this.state.orderForm[formInput].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ checkingOut: false });
        this.props.history.push("/");
      })
      .catch((error) => this.setState({ checkingOut: false }));
  };

  formChangedHandler = (event, inputIdentifier) => {
    const updatedOrder = {
      ...this.state.orderForm,
    };
    const updatedFormElement = { ...updatedOrder[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedOrder[inputIdentifier] = updatedFormElement;
    this.setState({ orderForm: updatedOrder });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formElement) => (
          <Forms
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(event) => this.formChangedHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="Success"> Order </Button>
      </form>
    );
    if (this.state.checkingOut) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact info: </h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
};

export default connect(mapStateToProps)(ContactData);
