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
        if (!price || typeof Number(price) !== "number")  errors.price = 'Price is required and should be a number'
        if (!stock || typeof Number(stock) !== "number")  errors.stock = 'Stock is required and should be a number'
        if (!description) errors.description = 'Description is required'
        setValidations(errors)
      }
      validate()
    }, [previewImg, productName, price, stock, description])

    // grab user id from state
    const user = useSelector((state) => state.session.user)
    if (!user) {
      return null;
    }

    const userId = user.id
    // console.log("user.id", user.id)


    const handleSubmit = async (e) => {
      e.preventDefault();
      setSubmitted(true)
      if (!Object.values(validations).length) {
        const newProduct = {
            "product_name": productName,
            "description": description,
            "price": price,
            "seller_id": userId,
            "stock": stock,
            "preview_img": previewImg
        };
        
        setProductName('')
        setDescription('')
        setPrice('')
        setStock('')
        setPreviewImg('')
        setValidations({})

        let createdProduct = await dispatch(addNewProduct(newProduct));

        if (createdProduct) {
            history.push(`/`);
        }
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
            {submitted && validations.name && (<p className='create__product__error'>{validations.name}</p>)}
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
            {submitted && validations.description && (<p className='create__product__error'>{validations.description}</p>)}
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
            {submitted && validations.price && (<p className='create__product__error'>{validations.price}</p>)}
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
             {submitted && validations.stock && (<p className='create__product__error'>{validations.stock}</p>)}
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
             {submitted && validations.previewImg && (<p className='create__product__error'>{validations.previewImg}</p>)}
          </label>
          <br />
          <button type="submit">Create Listing</button>
        </form>
      </div>
    );
}

export default NewProductForm
