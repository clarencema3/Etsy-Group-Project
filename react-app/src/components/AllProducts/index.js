import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchProducts } from "../../store/products";


const ShowAllProducts = () => {
    const dispatch = useDispatch()
    const products = useSelector(state => state.products.products)
    const user = useSelector((state) => state.session.user)

    const userLoggedIn = () => {
        if (user) {
            return user && (
                <h1>Welcome back, <NavLink to={`/products/current`}>{user.username}</NavLink></h1>
            )
        } else {
            return (
                <h1>Incredible style and decor, plus one-of-a-kind gifts right this way!
                </h1>
            )
        }
    }

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])


    if (!products) {
        return <div>Loading...</div>
    }
    const productsArr = Object.values(products)
    console.log("Products array from products:", productsArr)
    return productsArr && products && (
        <>

            {userLoggedIn()}
            <div className="imageContainer">
                {productsArr?.map((product) => (
                    <div className="productCard" key={product?.id}>
                        <NavLink to={`/products/${product.id}`}>
                            <img src={product.preview_img} alt="product image" />${Number(product.price).toFixed(2)}
                        </NavLink>
                    </div>

                ))}
            </div>
            <div>
                What is Etsy?
            </div>
            <div>

                Support independent creators
            </div>
            <div>
                There’s no Etsy warehouse – just millions of people selling the things they love. We make the whole process easy, helping you connect directly with makers to find something extraordinary.
            </div>
            <div>
                Have a question? Well, we’ve got some answers.
                <button onClick={() => alert('Feature Coming Soon...')}>Go to Help Center</button>

            </div>
        </>
    )
}

export default ShowAllProducts
