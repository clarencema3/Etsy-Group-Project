import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { fetchSellersProducts } from "../../store/products";
import OpenModalButton from "../OpenModalButton";
import "./SellersProducts.css"
import DeleteProductModal from "./deleteProductModal";
import EditProductModal from "./editProductModal";
import EditImage from "./editImageModal";

const SellersProducts = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user)
  const sellerProducts = useSelector(state => state.products.sellerProducts)

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
          <img className="sellerImageLogo" src="https://www.pngfind.com/pngs/m/93-938050_png-file-transparent-white-user-icon-png-download.png" alt="logo" />
          <div className="sellersUserAndListingContainer">
            <strong>{user?.username}'s Store</strong>
            <NavLink className="makeAListing" to={"/products/new"}>+ Add a Product to your store</NavLink>
          </div>
        </div>
      </div>

      <div className="sellersProductCardsContainer">
        {sellerProductsArr.map(sellersProduct => (
          <div className="sellersProductCardDiv">
           
              <div className="sellersProductCard " key={sellersProduct.id} onClick={() => history.push(`/products/${sellersProduct.id}`)}>
                <NavLink to={`/products/${sellersProduct.id}`}>
                  <img className='product-img' src={sellersProduct.preview_img} alt='product' />
                </NavLink>
                <OpenModalButton
                buttonText={<i className="fas fa-camera" />}
                modalClass='edit-product-img'
                modalComponent={
                  <EditImage product={sellersProduct} />
                }
                />
              </div>
            <div className="sellersProductNameEditRemove">
              <div className="sellers-product-name">
                {sellersProduct.product_name}
              </div>
              <div className="seller-product-btns">
                <OpenModalButton
                  modalClass="sellerProductEditButton"
                  buttonText="Edit"
                  modalComponent={
                    <EditProductModal id={sellersProduct.id} />
                  }
                />

                <OpenModalButton
                  modalClass="sellerProductRemoveButton"
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
