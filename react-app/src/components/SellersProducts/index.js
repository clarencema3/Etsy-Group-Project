import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { fetchSellersProducts } from "../../store/products";
import OpenModalButton from "../OpenModalButton";
import "./SellersProducts.css"
import { useModal } from "../../context/Modal";
import DeleteProductModal from "./deleteProductModal";

const SellersProducts = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user)
  const sellerProducts = useSelector(state => state.products.sellerProducts)
  // const products = useSelector(state => state.products.products)
  // console.log("products from sellers products", products)
  // const sellersProduct = useSelector(state => state.products.products && Object.values(state.products.products).filter(productItem => {
  //   return productItem.seller_id === user.id
  // }))

  useEffect(() => {
    dispatch(fetchSellersProducts(user && user.id))
  }, [dispatch, user && user.id])

  if (!sellerProducts) {
    return <div>Loading...</div>
  }

  const sellerProductsArr = Object.values(sellerProducts)



  const userLoggedIn = () => {
    if (!user) {
      return (
        <Redirect to={"/"} />
      )
    }
  }

  return (
    <div className="white-space">
      {userLoggedIn()}
      <div className="sellerProductsPageContainer">
        <div className="sellersLogoContainer">
          <img className="sellerImageLogo" src="https://i.etsystatic.com/25260451/r/il/402e7c/4387266595/il_794xN.4387266595_dh89.jpg" alt="logo" />
          <div className="sellersUserAndListingContainer">
            <strong>{user.username}</strong>
            <NavLink className="makeAListing" to={"/products/new"}>Make a Listing</NavLink>
          </div>
        </div>
      </div>

      <div className="sellersProductCardsContainer">
        {sellerProductsArr.map(sellersProduct => (
          <div>
            <NavLink to={`/products/${sellersProduct.id}`}>
              <div className="sellersProductCard " key={sellersProduct.id}>
                <img src={sellersProduct.preview_img} />
              </div>
            </NavLink>

            <div className="sellersProductNameEditRemove">
              <div>
                {sellersProduct.product_name}
              </div>
              <div>
                <OpenModalButton
                  buttonText="Edit"
                  modalComponent={
                    <div>
                      <h2>Edit Form Here</h2>
                    </div>
                  }
                />

                <OpenModalButton
                  buttonText="Remove"
                  modalComponent={
                    <DeleteProductModal id={sellersProduct.id} />
                  }
                />
              </div>
            </div>
            <div className="sellersProductPrice">
              <strong>${Number(sellersProduct.price).toFixed(2)}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SellersProducts
