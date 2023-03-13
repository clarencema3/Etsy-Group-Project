import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchProducts } from "../../store/products";
import ShowAllProducts from "../AllProducts";
import "./SellersProducts.css"

const SellersProducts = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user)
  const products = useSelector(state => state.products.products)
  return (
    <div className="white-space">
      <h1>hi</h1>
    </div>
  )
}

export default SellersProducts
