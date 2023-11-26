import { useState, useEffect } from "react";
import SalesPerson from "./SalesPerson";

const SalesTeam = () => {
  const [salesTeam, setSalesTeam] = useState([]);
  useEffect(() => {
    const getSalesTeam = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/BeSpokedBikesAPI/sales"
        );
        if (response.ok) {
          const data = await response.json();
          setSalesTeam(data);
        } else {
          console.error(`Server Error: ${response.error}`);
        }
      } catch (e) {
        console.error(`Network Error: ${e}`);
      }
    };

    getSalesTeam();
  }, []);
  return (
    <div>
      <h1>Sales Team</h1>
      {salesTeam.map((person) => (
        <SalesPerson salesPerson={person} key={person.id} />
      ))}
    </div>
  );
};

export default SalesTeam;
