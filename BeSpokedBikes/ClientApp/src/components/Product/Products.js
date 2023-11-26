import { useEffect, useState } from 'react'
import Product from './Product'

const Products = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        const getProductsData = async () => {
            try {
                const response = await fetch('https://localhost:7255/BeSpokedBikesAPI/products')
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data)
                } else {
                    console.error(`Server Error: ${response.error}`)
                }
            } catch (e) {
                console.error(`Network Error: ${e}`)
            }
        }

        getProductsData();
    },[])

    return (
        <div>
            <h2>Products Listing</h2>
            {products.map(product => <Product product={product} key={product.id} />)}
        </div>)
}

export default Products