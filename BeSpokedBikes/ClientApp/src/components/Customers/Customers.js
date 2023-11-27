import { useState, useEffect } from "react";
import styles from "./Customers.module.css";
import Customer from "./Customer";

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  // Fetch the customers data from endpoint on component mount
  useEffect(() => {
    const getCustomers = async () => {
      try {
        const response = await fetch(
          "https://localhost:7255/BeSpokedBikesAPI/customers"
        );

        if (response.ok) {
          const data = await response.json();
          setCustomers(data);
        } else {
          throw new Error("Network error, response was not ok");
        }
      } catch (e) {
        console.error(`There was a problem in the request: ${e}`);
      }
    };

    getCustomers();
  }, []);

  return (
    <div>
      <h2 style={{ color: "white" }}>Customers</h2>
      <div className={styles.customerGridContainer}>
        {customers.map((person) => (
          <Customer customer={person} key={person.id} />
        ))}
      </div>
    </div>
  );
};

export default Customers;
