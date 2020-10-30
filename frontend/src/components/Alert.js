import React, { useState } from "react";
import { Button, Alert, Container } from "react-bootstrap";

function AlertDismissible() {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert
        variant="blue"
        style={{ borderColor: "#2376d7", borderRadius: 0, margin: 0 }}
        onClose={() => setShow(false)}
        dismissible
      >
        {/* <Alert.Heading>Oh snap! You got an error!</Alert.Heading> */}
        <Container>
          <div
            className="blue-alert tw-whitespace-no-wrap tw-truncate"
            style={{ fontSize: ".875rem" }}
          >
            <span className="font-weight-bold whitespace-no-wrap">
              COVID-19 IMPACT
            </span>{" "}
            Learn more about how the Coronavirus is impacting farming
            communities here.
          </div>
        </Container>
        {/* <p>Change this and that and try again. Duis mollis, est non commodo</p> */}
      </Alert>
    );
  }
  return "";
}

export default AlertDismissible;
