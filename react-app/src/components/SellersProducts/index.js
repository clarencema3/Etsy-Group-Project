import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchSellersProducts } from "../../store/products";

import "./SellersProducts.css"

const SellersProducts = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user)
  // const products = useSelector(state => state.products.products)
  const sellerProducts = useSelector(state => state.products.sellerProducts)
  // console.log("products from sellers products", products)
  // const sellersProduct = useSelector(state => state.products.products && Object.values(state.products.products).filter(productItem => {
  //   return productItem.seller_id === user.id
  // }))

  useEffect(() => {
    dispatch(fetchSellersProducts(user && user.id))
  }, [dispatch])

  if (!sellerProducts) {
    return <div>Loading...</div>
  }

  // const sellersProduct = Object.values(products).filter(productItem => {
  //   return productItem.seller_id === user.id
  // })



  return (
    <div className="white-space">
      <h1>hi</h1>
    </div>
  )
}

export default SellersProducts
