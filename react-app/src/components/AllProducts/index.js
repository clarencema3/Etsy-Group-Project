import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchProducts } from "../../store/products";
const ShowAllProducts = () => {
    const dispatch = useDispatch()
    const products = useSelector(state => state.products.products)
    
    
    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    if (!products) {
        return <div>Loading...</div>
    }
    const productsArr = Object.values(products)
    console.log("Products array from products:", productsArr)
    return productsArr && products &&(
        <>
            <h1>Welcome back, Demo User</h1>
            <div className="imageContainer">
{productsArr?.map((product) => (
    <div className="productCard" key={product?.id}>
        <img src={product.preview_img} alt="Big product pic" />${Number(product.price).toFixed(2)}</div>
))}
            </div>
            <div>
                What is Etsy?
            </div>
            <div>
                Random Description
            </div>
        </>
    )
}

export default ShowAllProducts
