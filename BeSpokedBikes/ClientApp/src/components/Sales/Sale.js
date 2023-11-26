import React from "react";
import styles from "./Sale.module.css";

const formatDate = (date) => {
  let d = new Date(date);

  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
};

const Sale = ({ sale }) => {
  const { salesPerson, product, customer } = sale;

  return (
    <div className={styles.saleContainer}>
      <>
        <div>
          <h5>
            Sales Person: {salesPerson.firstName} {salesPerson.lastName}
          </h5>
          <p>Sale Price: ${product.salePrice}</p>
          <p>Date of Sale: {formatDate(sale.saleDate)}</p>
          <p>Commission Earned: ${sale.commission.toFixed(2)}</p>
        </div>
        <div>
          <h6>Product Sold: {product.name}</h6>
          <h6>Product Manufacturer: {product.manufacturer}</h6>
        </div>
        <div>
          <h6>
            Customer: {customer.firstName} {customer.lastName}
            <p>Customer Address: {customer.address}</p>
            <p>Customer Phone Number: {customer.phoneNumber}</p>
          </h6>
        </div>
      </>
    </div>
  );
};

export default Sale;
