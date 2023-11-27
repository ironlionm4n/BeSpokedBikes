import React from "react";
import styles from "./SalesPerson.module.css";
import { Link } from "react-router-dom";

const SalesPerson = ({ salesPerson }) => {
  //#region  Derived state variables
  const startDate = new Date(salesPerson.startDate);
  // Formatting start date for mm/dd/yyyy rendering
  const formattedDate = `${
    startDate.getMonth() + 1
  }/${startDate.getDate()}/${startDate.getFullYear()}`;

  // creating a termination date based on the existence of one in the sales person object
  let terminationDate = salesPerson.terminationDate
    ? new Date(salesPerson.terminationDate)
    : "";

  // If the termination date is a truthy value then format it for mm/dd/yyyy rendering
  if (terminationDate) {
    terminationDate = `${
      terminationDate.getMonth() + 1
    }/${terminationDate.getDate()}/${terminationDate.getFullYear()}`;
  }
  //#endregion

  return (
    <div className={styles.salesPersonContainer}>
      <div className={styles.salesPersonContent}>
        <h3>
          {salesPerson.firstName} {salesPerson.lastName}
        </h3>
        <p>
          <strong>Phone Number:</strong> {salesPerson.phoneNumber}
        </p>
        {!terminationDate ? (
          <p>
            <strong>Employed Since:</strong> {formattedDate}
          </p>
        ) : (
          <>
            <p>
              <strong>Start Date:</strong> {formattedDate}
            </p>
            <p>
              <strong>TerminationDate:</strong> {terminationDate}
            </p>
          </>
        )}

        <p>
          <strong>Manager:</strong> {salesPerson.manager}
        </p>
      </div>
      <Link
        to={`/sales-team/${salesPerson.id}`}
        className={styles.centerButton}
      >
        <button className={styles.updateBtn}>Update</button>
      </Link>
    </div>
  );
};

export default SalesPerson;
