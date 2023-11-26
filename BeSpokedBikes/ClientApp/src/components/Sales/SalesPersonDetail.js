import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader";
import styles from "./SalesPersonDetail.module.css";

const initialSalesPersonData = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  address: "",
  manager: "",
  terminationDate: "",
  startDate: "",
};

const formatDate = (date) => {
  if (!date) return null;

  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  let year = d.getFullYear();

  if (month.length < 2) {
    month = "0" + month;
  }

  if (day.length < 2) {
    day = "0" + day;
  }

  return `${year}-${month}-${day}`;
};

const SalesPersonDetail = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [salesPerson, setSalesPerson] = useState(null);
  const [updateData, setUpdateData] = useState(initialSalesPersonData);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formattedBody = {
      ...updateData,
      startDate: new Date(updateData.startDate).toISOString(),
      terminationDate: updateData.terminationDate
        ? new Date(updateData.terminationDate).toISOString
        : null,
    };
    try {
      const response = await fetch(
        `http://localhost:5000/BeSpokedBikesAPI/sales/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedBody),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setUpdateData({
          ...data,
          startDate: formatDate(data.startDate),
          terminationDate: formatDate(data.terminationDate),
        });
        setSalesPerson(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const getSalesPerson = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:5000/BeSpokedBikesAPI/sales/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setSalesPerson(data);
          setUpdateData({
            ...data,
            startDate: formatDate(data.startDate),
            terminationDate: data.terminationDate
              ? formatDate(data.terminationDate)
              : "",
          });
        } else {
          console.error(`Server Error: ${response.status}`);
        }
      } catch (e) {
        console.error(`Network Error: ${e}`);
      } finally {
        setIsLoading(false);
      }
    };

    getSalesPerson();
  }, [id]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : salesPerson ? (
        <>
          <h1 style={{ color: "white" }}>Update Sales Person's Details</h1>
          <div className={styles.detailContainer}>
            <div className={styles.details}>
              <h2>
                {salesPerson.firstName} {salesPerson.lastName}
              </h2>
              <p>Phone Number: {salesPerson.phoneNumber}</p>
              <p>Address: {salesPerson.address}</p>
              <p>Start Date: {formatDate(salesPerson.startDate)}</p>
              <p>
                Termination Date:{" "}
                {salesPerson.terminationDate || "No Termination Date"}
              </p>
              <p>Manager: {salesPerson.manager}</p>
            </div>
            <form onSubmit={handleSubmit} className={styles.details}>
              <div className={styles.input}>
                <label htmlFor="firstName">Enter First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={updateData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.input}>
                <label htmlFor="lastName">Enter Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={updateData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.input}>
                <label htmlFor="phoneNumber">Enter Phone Number</label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={Number(updateData.phoneNumber)}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.input}>
                <label htmlFor="startDate">Update Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={updateData.startDate}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.input}>
                <label htmlFor="terminationDate">Update Termination Date</label>
                <input
                  type="date"
                  id="terminationDate"
                  name="terminationDate"
                  value={updateData.terminationDate || ""}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.input}>
                <label htmlFor="address">Enter Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={updateData.address}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.input}>
                <label htmlFor="manager">Enter Manager</label>
                <input
                  type="text"
                  id="manager"
                  name="manager"
                  value={updateData.manager}
                  onChange={handleChange}
                />
              </div>
              <button type="submit">Update</button>
            </form>
          </div>
        </>
      ) : (
        <p>Sales Person Not Found</p>
      )}
    </>
  );
};

export default SalesPersonDetail;
