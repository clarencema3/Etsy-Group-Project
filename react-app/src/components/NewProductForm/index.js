import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import './NewProductForm.css'
import { addNewProduct } from "../../store/products";
import { useDispatch, useSelector } from "react-redux";

function NewProductForm() {
    const history = useHistory();
    const dispatch = useDispatch();

    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [previewImg, setPreviewImg] = useState("");

    // grab user id from state
    const user = useSelector((state) => state.session.user)
    if (!user) {
      return null;
    }

    const userId = user.id
    // console.log("user.id", user.id)


    const handleSubmit = async (e) => {
        e.preventDefault();

        const newProduct = {
          "product_name": productName,
            "description": description,
            "price": price,
            "seller_id": userId,
            "stock": stock,
          "preview_img": previewImg
        };

        console.log("newProduct from submit form handler", newProduct)

        let createdProduct = await dispatch(addNewProduct(newProduct));
        console.log("newProduct from inside form CLICKHANDLER", createdProduct);

        if (createdProduct) {
            history.push(`/products/${createdProduct.id}`);
        }

    }

    return (
      <div>
        <h2>Product Details</h2>
        <p>Tell the world all about your item and why they'll love it.</p>
        <form onSubmit={handleSubmit}>
          <label>
            Product Name*
            <input
              type="text"
              name="productName"
              value={productName}
              placeholder="Product Name"
              onChange={(e) => setProductName(e.target.value)}
            />
          </label>
          <label for="description">
            <p>Description*</p>

            <textarea
              name="description"
              id="description"
              cols="30"
              rows="10"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            >
              {description}
            </textarea>
          </label>
          <h2>Inventory & Pricing</h2>
          <p>
            Factor cost and materials and labor. Consider the total price buyers
            will pay too.
          </p>
          <label>
            <p>Price*</p>
            <input
              type="text"
              name="price"
              value={price}
              placeholder="Price (USD)"
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <label>
            <p>Stock*</p>
            <input
              type="text"
              name="stock"
              value={stock}
              placeholder="Stock"
              onChange={(e) => setStock(e.target.value)}
            />
          </label>
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
              value={previewImg}
              placeholder="Preview Img"
              onChange={(e) => setPreviewImg(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">Create Listing</button>
        </form>
      </div>
    );
}

export default NewProductForm
