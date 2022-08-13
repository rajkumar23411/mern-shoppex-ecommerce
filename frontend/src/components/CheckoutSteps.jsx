import React from "react";
import { Step, StepLabel, Stepper } from "@material-ui/core";
import "../App.css"
const CheckoutSteps = ({ activeSteps }) => {
  const steps = [
    {
      label: "Address",
      icon: <i className="fa-solid fa-truck-fast stepIcon"></i>,
    },
    {
      label: "Confirm Order",
      icon: <i className="fa-solid fa-circle-check stepIcon"></i>,
    },
    {
      label: "Payment",
      icon: <i className="fa-solid fa-credit-card stepIcon"></i>,
    },
  ];
  return (
    <>
      <Stepper alternativeLabel activeStep={activeSteps}>
        {steps.map((item, index) => (
          <Step key={index} active={activeSteps===index ? true : false} completed={activeSteps >= index ? true : false}>
            <StepLabel icon={item.icon} style={{color: activeSteps >= index ? "#2ecc71": "rgba(0,0,0,0.6)"}}>{item.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
};

export default CheckoutSteps;
