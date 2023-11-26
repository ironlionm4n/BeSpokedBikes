import React, { useEffect, useState } from "react";
import DatePicker from "./DatePicker";
import Sale from "./Sale";
import styles from "./Sale.module.css";

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState(null);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const handleStartChanged = (event) => {
    event.preventDefault();
    const startDateSplit = event.target.value.split("-");
    setStartDate(
      new Date(startDateSplit[0], startDateSplit[1] - 1, startDateSplit[2])
    );
  };

  const handleEndChanged = (event) => {
    event.preventDefault();
    const endDateSplit = event.target.value.split("-");
    setEndDate(new Date(endDateSplit[0], endDateSplit[1] - 1, endDateSplit[2]));
  };

  useEffect(() => {
    const getSalesData = async () => {
      try {
        const response = await fetch(
          "https://localhost:7255/BeSpokedBikesAPI/sales"
        );
        if (response.ok) {
          const data = await response.json();
          setSales(data);
        } else {
          throw new Error("Network error, response was not ok");
        }
      } catch (e) {
        console.error(`There was a problem in the request: ${e}`);
      }
    };

    getSalesData();
  }, []);

  useEffect(() => {
    let filteredSales = null;
    if (startDate && endDate) {
      filteredSales = sales.filter((sale) => {
        const saleDate = new Date(sale.saleDate);
        return saleDate >= startDate && saleDate <= endDate;
      });
    } else if (startDate && !endDate) {
      filteredSales = sales.filter((sale) => {
        const saleDate = new Date(sale.saleDate);
        return saleDate >= startDate;
      });
    } else if (!startDate && endDate) {
      filteredSales = sales.filter((sale) => {
        const saleDate = new Date(sale.saleDate);
        return saleDate <= endDate;
      });
    }

    if (filteredSales !== null) {
      setFilteredSales(filteredSales);
    }
  }, [startDate, endDate, sales]);

  return (
    <div>
      <h1 style={{ color: "white" }}>List of Sales</h1>
      <div>
        <DatePicker
          handleStartChanged={handleStartChanged}
          handleEndChanged={handleEndChanged}
        />
        <div className={styles.saleGridContainer}>
          {filteredSales !== null
            ? filteredSales.map((sale) => <Sale sale={sale} key={sale.id} />)
            : sales.map((sale) => <Sale sale={sale} key={sale.id} />)}
        </div>
      </div>
    </div>
  );
};

export default Sales;
