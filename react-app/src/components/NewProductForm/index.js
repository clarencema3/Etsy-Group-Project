import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import './NewProductForm.css'
import { addNewProduct } from "../../store/products";
import { useDispatch, useSelector } from "react-redux";
// import validator from 'validator'

function NewProductForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [previewImg, setPreviewImg] = useState("");
  const [validations, setValidations] = useState([]);


  // grab user id from state
  const user = useSelector((state) => state.session.user)
  if (!user) {
    history.push('/')
  }

  const userId = user?.id


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append("product_name", productName);
    formData.append("description", description);
    formData.append("price", Number(price).toFixed(2));
    formData.append("seller_id", userId);
    formData.append("stock", Number(stock));
    formData.append("preview_img", previewImg);

    let data = await dispatch(addNewProduct(formData));
    if (data) {
        setValidations(data)
    } else {
        history.push('/')
    }

  }


  return (
    <form
      className="create-form"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <div className="form-contents">
        <div className="form-section">
          <h2>Product Details</h2>
          <p>Tell the world all about your item and why they'll love it.</p>
          <ul>
              {validations && validations.map((error, idx) => (
                  <li key={idx} className="create__product__error">{error}</li>
              ))}
          </ul>
          <p>Product Name *</p>
          <input
            type="text"
            name="productName"
            value={productName}
            placeholder="Product Name"
            className="form-input"
            onChange={(e) => setProductName(e.target.value)}
          />
          <label for="description">
            <p>Description *</p>
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="10"
              placeholder="Description"
              className="form-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            >
            </textarea>
          </label>
        </div>
        <div className="form-section">
          <h2>Inventory & Pricing</h2>
          <p>
            Factor cost and materials and labor. Consider the total price buyers
            will pay too.
          </p>
          <label>
            <p>Price *</p>
            <input
              type="text"
              name="price"
              value={price}
              placeholder="Price (USD)"
              className="form-input"
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <label>
            <p>Stock *</p>
            <input
              type="text"
              name="stock"
              value={stock}
              placeholder="Stock"
              className="form-input"
              onChange={(e) => setStock(e.target.value)}
            />
          </label>
        </div>
        <h2>Photos</h2>
        <p>
          Choose 1 Preview Photo to represent your image. You can add additional
          images to your listing later.
        </p>
        <label>
          <p>Preview Image *</p>
          <input
            type="file"
            name="previewImg"
            className="form-input"
            accept="image/*"
            onChange={(e) => setPreviewImg(e.target.files[0])}
          />
        </label>
        <div className="form-button-div">
          <button className="submit-form-btn">Create Listing</button>
        </div>
      </div>
    </form>
  );
}

export default NewProductForm
