import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader";
import styles from "./ProductDetail.module.css";

const initialUpdateData = {
  manufacturer: "",
  name: "",
  style: 0,
  purchasePrice: 0,
  salePrice: 0,
  qtyOnHand: 0,
  commissionPercentage: 0,
};

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [updateData, setUpdateData] = useState(initialUpdateData);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formattedBody = {
      ...updateData,
      purchasePrice: parseFloat(updateData.purchasePrice),
      salePrice: parseFloat(updateData.salePrice),
      commissionPercentage: parseFloat(updateData.commissionPercentage),
      qtyOnHand: parseInt(updateData.qtyOnHand),
      style: parseInt(updateData.style),
    };
    try {
      const response = await fetch(
        `http://localhost:5000/BeSpokedBikesAPI/products/${id}`,
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
        setProduct(data);
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
    const getProductData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:5000/BeSpokedBikesAPI/products/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
          setUpdateData(data);
        } else {
          console.error(`Server Error: ${response.status}`);
        }
      } catch (e) {
        console.error(`Network Error: ${e}`);
      } finally {
        setIsLoading(false);
      }
    };

    getProductData();
  }, [id]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : product ? (
        <>
          <h1 style={{ color: "white" }}>Update Product's Details</h1>
          <div className={styles.detailContainer}>
            <div className={styles.details}>
              <h2>{product.manufacturer}</h2>
              <h3>{product.name}</h3>
              <p>
                Bike Style:{" "}
                {product.style === 0
                  ? "Road Bike"
                  : product.style === 1
                  ? "Mountain Bike"
                  : "BMX Bike"}
              </p>
              <p>Purchase Price: ${product.purchasePrice.toFixed(2)}</p>
              <p>Sale Price: ${product.salePrice.toFixed(2)}</p>
              <p>Quantity On Hande: {product.qtyOnHand}</p>
              <p>Commission Percentage: {product.commissionPercentage}%</p>
            </div>
            <form onSubmit={handleSubmit} className={styles.details}>
              <div className={styles.input}>
                <label htmlFor="manufacturer">Enter Manufacturer</label>
                <input
                  type="text"
                  id="manufacturer"
                  name="manufacturer"
                  value={updateData.manufacturer}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.input}>
                <label htmlFor="name">Enter Bike Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={updateData.name}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.input}>
                <label htmlFor="style">Select Bike Style</label>
                <select
                  type="number"
                  id="style"
                  name="style"
                  value={Number(updateData.style)}
                  onChange={handleChange}
                >
                  <option value={0}>Road</option>
                  <option value={1}>Mountain</option>
                  <option value={2}>BMX</option>
                </select>
              </div>
              <div className={styles.input}>
                <label htmlFor="purchasePrice">Enter Purchase Price</label>
                <input
                  type="number"
                  id="purchasePrice"
                  name="purchasePrice"
                  value={Number(updateData.purchasePrice)}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.input}>
                <label htmlFor="salePrice">Enter Sale Price</label>
                <input
                  type="number"
                  id="salePrice"
                  name="salePrice"
                  value={Number(updateData.salePrice)}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.input}>
                <label htmlFor="commissionPercentage">
                  Enter Commission Percentage
                </label>
                <input
                  type="number"
                  id="commissionPercentage"
                  name="commissionPercentage"
                  value={updateData.commissionPercentage}
                  onChange={handleChange}
                  min={0}
                  step={0.01}
                  max={1}
                />
              </div>
              <div className={styles.input}>
                <label htmlFor="qtyOnHand">Enter Qty On Hand</label>
                <input
                  type="number"
                  id="qtyOnHand"
                  name="qtyOnHand"
                  value={updateData.qtyOnHand}
                  onChange={handleChange}
                  min={0}
                  step={1}
                  max={1000}
                />
              </div>
              <button type="submit">Update</button>
            </form>
          </div>
        </>
      ) : (
        <p>Product Not Found</p>
      )}
    </div>
  );
};

// const initialUpdateData = {
//     manufacturer: "",
//     name: "",
//     style: 0,
//     purchasePrice: 0,
//     salePrice: 0,
//     qtyOnHand: 0,
//     commisionPercentage: 0,
//   };
export default ProductDetail;
