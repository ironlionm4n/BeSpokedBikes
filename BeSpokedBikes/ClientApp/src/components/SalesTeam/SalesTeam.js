import { useState, useEffect } from "react";
import SalesPerson from "./SalesPerson";
import styles from "./SalesTeam.module.css";

const SalesTeam = () => {
  const [salesTeam, setSalesTeam] = useState([]);

  // Handles fetching all the sales team data
  // Runs on component mount
  useEffect(() => {
    const getSalesTeam = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/BeSpokedBikesAPI/sales-team"
        );
        if (response.ok) {
          const data = await response.json();
          setSalesTeam(data);
        } else {
          throw new Error("Network error, response was not ok");
        }
      } catch (e) {
        console.error(`There was a problem in the request: ${e}`);
      }
    };

    getSalesTeam();
  }, []);
  return (
    <div>
      <h1 style={{ color: "white" }}>Sales Team</h1>
      <div className={styles.salesTeamGridContainer}>
        {salesTeam.map((person) => (
          <SalesPerson salesPerson={person} key={person.id} />
        ))}
      </div>
    </div>
  );
};

export default SalesTeam;
