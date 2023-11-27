import styles from "./Product.module.css";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <div className={styles.productContainer}>
      <div className={styles.productContent}>
        <h3>
          {product.manufacturer} {product.name}
        </h3>
        <p>Purchase Price: ${product.purchasePrice.toFixed(2)}</p>
        <p>Sale Price: ${product.salePrice.toFixed(2)}</p>
        {/* Ternary chaining for displaying the correct style of bike */}
        <p>
          {product.style === 0
            ? "Road Bike"
            : product.style === 1
            ? "Mountain Bike"
            : "BMX Bike"}
        </p>
        <span>Quantity on Hand: {product.qtyOnHand}</span>
      </div>
      <Link to={`/products/${product.id}`} className={styles.centerButton}>
        <button className={styles.updateBtn}>Update</button>
      </Link>
    </div>
  );
};

export default Product;
