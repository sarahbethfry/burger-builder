import React from "react";
import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavItems from "../NavItems/NavItems";
import Button from "../../UI/Button/Button";

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <Button clicked={props.openSideDrawer} btnType="Menu">
      <div></div>
      <div></div>
      <div></div>
    </Button>
    <Logo height="80%" />
    <nav className={classes.DesktopOnly}>
      <NavItems />
    </nav>
  </header>
);

export default toolbar;
