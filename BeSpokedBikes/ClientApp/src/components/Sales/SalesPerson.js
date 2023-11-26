import React from "react";
import styles from "./SalesPerson.module.css";
import { Link } from "react-router-dom";

const SalesPerson = ({ salesPerson }) => {
  const startDate = new Date(salesPerson.startDate);
  const formattedDate = `${
    startDate.getMonth() + 1
  }/${startDate.getDate()}/${startDate.getFullYear()}`;
  return (
    <div className={styles.salesPersonContainer}>
      <div className={styles.salesPersonContent}>
        <h3>
          {salesPerson.firstName} {salesPerson.lastName}
        </h3>
        <p>Phone Number: {salesPerson.phoneNumber}</p>
        <p>Employed Since: {formattedDate}</p>
        <p>Manager: {salesPerson.manager}</p>
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
