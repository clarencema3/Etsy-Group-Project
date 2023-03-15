import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { fetchSellersProducts } from "../../store/products";
import OpenModalButton from "../OpenModalButton";
import "./SellersProducts.css"
import DeleteProductModal from "./deleteProductModal";
import EditProductModal from "./editProductModal";

const SellersProducts = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user)
  const sellerProducts = useSelector(state => state.products.sellerProducts)
  // const products = useSelector(state => state.products.products)
  // console.log("products from sellers products", products)
  // const sellersProduct = useSelector(state => state.products.products && Object.values(state.products.products).filter(productItem => {
  //   return productItem.seller_id === user.id
  // }))

  useEffect(() => {
    dispatch(fetchSellersProducts(user?.id))
  }, [dispatch, user?.id])

  if (!sellerProducts) {
    return <div>Loading...</div>
  }

  const sellerProductsArr = Object.values(sellerProducts)

  if (!user) {
    history.push('/')
  }
  

  return (
    <div className="white-space">
      
      <div className="sellerProductsPageContainer">
        <div className="sellersLogoContainer">
          <img className="sellerImageLogo" src="https://i.etsystatic.com/25260451/r/il/402e7c/4387266595/il_794xN.4387266595_dh89.jpg" alt="logo" />
          <div className="sellersUserAndListingContainer">
            <strong>{user?.username}'s Store</strong>
            <NavLink className="makeAListing" to={"/products/new"}>+ Add a Product to your store</NavLink>
          </div>
        </div>
      </div>

      <div className="sellersProductCardsContainer">
        {sellerProductsArr.map(sellersProduct => (
          <div>
            <NavLink to={`/products/${sellersProduct.id}`}>
              <div className="sellersProductCard " key={sellersProduct.id}>
                <img src={sellersProduct.preview_img} alt='product'/>
              </div>
            </NavLink>

            <div className="sellersProductNameEditRemove">
              <div className="sellers-product-name">
                {sellersProduct.product_name}
              </div>
              <div className="seller-product-btns">
                <OpenModalButton
                  buttonText="Edit"
                  modalComponent={
                    <EditProductModal id={sellersProduct.id} />
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
