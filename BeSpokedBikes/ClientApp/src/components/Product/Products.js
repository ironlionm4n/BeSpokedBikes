import { useEffect, useState } from "react";
import Product from "./Product";
import styles from "./Product.module.css";

const Products = () => {
  const [products, setProducts] = useState([]);

  // Handles fetching all of the products data from the api
  // Runs on component mount
  useEffect(() => {
    const getProductsData = async () => {
      try {
        const response = await fetch(
          "https://localhost:7255/BeSpokedBikesAPI/products"
        );
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          throw new Error("Network error, response was not ok");
        }
      } catch (e) {
        console.error(`There was a problem in the request: ${e}`);
      }
    };

    getProductsData();
  }, []);

  return (
    <div>
      <h2 className={styles.productHeader}>Products Listing</h2>
      <div className={styles.productGridContainer}>
        {products.map((product) => (
          <Product product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default Products;
