import React from "react";
import styles from "./Customer.module.css";

const Customer = ({ customer }) => {
  //#region  Derived state variables
  const startDate = new Date(customer.startDate);
  // Format start date for mm/dd/yyyy during rendering
  const formattedDate = `${
    startDate.getMonth() + 1
  }/${startDate.getDate()}/${startDate.getFullYear()}`;
  //#endregion

  return (
    <div className={styles.customerContainer}>
      <div className={styles.customerContent}>
        <h2>
          {customer.firstName} {customer.lastName}
        </h2>
        <p>
          <strong>Address:</strong> {customer.address}
        </p>
        <p>
          <strong>Phone Number:</strong> {customer.phoneNumber}
        </p>
        <p>
          <strong>Start Date:</strong> {formattedDate}
        </p>
      </div>
    </div>
  );
};

export default Customer;
