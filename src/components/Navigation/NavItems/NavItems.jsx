import React from "react";
import NavItem from "./NavItem/NavItem";
import classes from "./NavItems.css";

const navItems = (props) => (
  <ul className={classes.NavItems}>
    <NavItem link="/">Burger Builder</NavItem>
    <NavItem link="/orders"> Orders</NavItem>
  </ul>
);

export default navItems;
