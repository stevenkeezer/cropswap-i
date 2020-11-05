import React from "react";
import { Alert } from "react-bootstrap";
import { EuiCallOut, EuiLink } from "@elastic/eui";

const Message = ({ variant, children }) => {
  return <EuiCallOut title={children} color={variant}></EuiCallOut>;
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
