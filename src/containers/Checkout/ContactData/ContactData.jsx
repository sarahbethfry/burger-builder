import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";
import classes from "./ContactData.css";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      zipCode: "",
    },
    checkingOut: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ checkingOut: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Sarah Fry",
        address: {
          street: "Test St.",
          zipCode: "99339",
          country: "United States",
        },
        email: "test@test.com",
      },
      deliveryMethod: "Same Day",
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ checkingOut: false });
        this.props.history.push("/");
      })
      .catch((error) => this.setState({ checkingOut: false }));
  };

  render() {
    let form = (
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <input
          className={classes.Input}
          type="email"
          name="email"
          placeholder="Your Email"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="Your Street"
        />
        <input
          className={classes.Input}
          type="text"
          name="zipCode"
          placeholder="Your Zip Code"
        />
        <Button clicked={this.orderHandler} btnType="Success">
          {" "}
          Order{" "}
        </Button>
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

export default ContactData;
