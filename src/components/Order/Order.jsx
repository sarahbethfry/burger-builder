import React from "react";

import classes from "./Order.css";

const order = (props) => {
  const ingredients = [];
  for (let i in props.ingredients) {
    ingredients.push({ name: i, amount: props.ingredients[i] });
  }
  const ingredientOutput = ingredients.map((ig) => {
    return (
      <span
        key={ig.name}
        style={{
          testTransform: "capitalize",
          display: "inline-block",
          border: "1px solid #ccc",
          padding: "5px",
        }}
      >
        {ig.name} ({ig.amount})
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price: <strong>USD {props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
