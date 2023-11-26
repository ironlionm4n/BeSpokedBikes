import styles from "./Product.module.css";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <div className={styles.productContainer}>
      <div>
        <h3>
          {product.manufacturer} {product.name}
        </h3>
        <p>Purchase Price: ${product.purchasePrice.toFixed(2)}</p>
        <p>Sale Price: ${product.salePrice.toFixed(2)}</p>
        <span>Quantity on Hand: {product.qtyOnHand}</span>
      </div>
      <Link to={`/products/${product.id}`}>
        <button>Update</button>
      </Link>
    </div>
  );
};

export default Product;
