import React from "react";
import NavItem from "./NavItem/NavItem";
import classes from "./NavItems.css";

const navItems = (props) => (
  <ul className={classes.NavItems}>
    <NavItem link="/">Burger Builder</NavItem>
    {props.isAuthenticated ? <NavItem link="/orders"> Orders</NavItem> : null}
    {!props.isAuthenticated ? (
      <NavItem link="/auth"> Sign In </NavItem>
    ) : (
      <NavItem link="/logout"> Log Out </NavItem>
    )}
  </ul>
);

export default navItems;
