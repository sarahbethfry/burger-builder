import React from "react";
import Logo from "../../Logo/Logo";
import NavItems from "../NavItems/NavItems";
import classes from "./SideDrawer.css";

const sideDrawer = (props) => {
  return (
    <div className={classes.SideDrawer}>
      <Logo height="11%" />
      <nav>
        <NavItems />
      </nav>
    </div>
  );
};

export default sideDrawer;
