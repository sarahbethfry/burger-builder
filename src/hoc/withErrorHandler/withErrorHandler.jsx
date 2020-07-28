import React from "react";
import Modal from "../../components/UI/Modal/Modal.jsx";
import Aux from "../Aux";

const withErrorHandler = (WrappedComponent) => {
  return (props) => {
    return (
      <Aux>
        <Modal show>Something didnt work!</Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default withErrorHandler;
