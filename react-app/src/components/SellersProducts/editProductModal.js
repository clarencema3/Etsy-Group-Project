import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useState, useEffect } from "react";
import { editProduct } from "../../store/products";

const EditProductModal = ({ id }) => {
  const dispatch = useDispatch()
  const { closeModal } = useModal()
  const sellerProducts = useSelector(state => state.products.sellerProducts)
  let currentProduct = sellerProducts[id]

  const [productName, setProductName] = useState(currentProduct.product_name);
  const [description, setDescription] = useState(currentProduct.description);
  const [price, setPrice] = useState(currentProduct.price);
  const [stock, setStock] = useState(currentProduct.stock);
  const [previewImg, setPreviewImg] = useState(currentProduct.preview_img);
  const [validations, setValidations] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function isImage(url) {
    return /(.*)(\.png|.jpg|.jpeg)/.test(url);
  }

  useEffect(() => {
    const validate = () => {
      const errors = {}
      if (isImage(previewImg) === false) errors.previewImg = 'Image URL must end in .png, .jpg, or .jpeg'
      if (!productName) errors.name = 'Product name is required'
      if (!price || isNaN(price) || price < 1) errors.price = 'Price is required and should be a number'
      if (!stock || isNaN(stock) || !Number.isInteger(+stock) || stock < 1) errors.stock = 'Stock is required and should be a number'
      if (!description) errors.description = 'Description is required'
      setValidations(errors)
    }
    validate()
  }, [previewImg, productName, price, stock, description])

  const user = useSelector((state) => state.session.user)
  if (!user) {
    return null;
  }

  const userId = user.id

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true)
    if (!Object.values(validations).length) {
      const editedData = {
        "product_name": productName,
        "description": description,
        "price": Number(price).toFixed(2),
        "seller_id": userId,
        "stock": Number(stock),
        "id": currentProduct.id,
        "preview_img": previewImg
      };

      setProductName('')
      setDescription('')
      setPrice('')
      setStock('')
      setPreviewImg('')
      setValidations({})

      dispatch(editProduct(editedData));
      closeModal()
    }
  }

  return (
    <form className="edit-product-form" onSubmit={handleSubmit}>
      <div className="edit-product-contents">
        <div className="edit-product-div">
          <h2>Product Details</h2>
          <p>Tell the world all about your item and why they'll love it.</p>
          <p className="edit-product-name">
            Product Name
          </p>
          <input
            className="edit-product-inputs"
            type="text"
            name="productName"
            value={productName}
            placeholder="Product Name"
            onChange={(e) => setProductName(e.target.value)}
          />
          {submitted && validations.name && (<p className='create__product__error'>{validations.name}</p>)}
        </div>
        <div className="edit-product-div">
          <label for="description">
            <p>Description*</p>
            <textarea
              name="description"
              id="description"
              className="edit-product-textarea"
              rows="10"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            >
              {description}
            </textarea>
            {submitted && validations.description && (<p className='create__product__error'>{validations.description}</p>)}
          </label>
        </div>
        <div className="edit-product-div">
          <h2>Inventory & Pricing</h2>
          <p>
            Factor cost and materials and labor. Consider the total price buyers
            will pay too.
          </p>
        </div>
        <div className="editProductPriceAndStock">
          <label className="editLabelForPrice">
            <p>Price*</p>
            <input
              type="text"
              name="price"
              className="edit-product-inputs"
              value={price}
              placeholder="Price (USD)"
              onChange={(e) => setPrice(e.target.value)}
            />
            {submitted && validations.price && (<p className='create__product__error'>{validations.price}</p>)}
          </label>
          <label className="editLabelForStock">
            <p>Stock*</p>
            <input
              type="text"
              name="stock"
              className="edit-product-inputs"
              value={stock}
              placeholder="Stock"
              onChange={(e) => setStock(e.target.value)}
            />
            {submitted && validations.stock && (<p className='create__product__error'>{validations.stock}</p>)}
          </label>
        </div>
        <div className="edit-product-div">
          <h2>Photos</h2>
          <p>
            Choose 1 Preview Photo to represent your image. You can add
            additional images to your listing later.
          </p>
          <label>
            <p>Preview Image*</p>
            <input
              type="text"
              name="previewImg"
              className="edit-product-inputs"
              value={previewImg}
              placeholder="Preview Img"
              onChange={(e) => setPreviewImg(e.target.value)}
            />
            {submitted && validations.previewImg && (<p className='create__product__error'>{validations.previewImg}</p>)}
          </label>
        </div>
        <br />
        <button className="submit-form-btn">Edit Listing</button>
      </div>
    </form>
  )
}

export default EditProductModal
