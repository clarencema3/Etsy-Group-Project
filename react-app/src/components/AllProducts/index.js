import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchProducts } from "../../store/products";
import "./AllProducts.css"
const ShowAllProducts = () => {
    const dispatch = useDispatch()
    const products = useSelector(state => state.products.products)
    const user = useSelector((state) => state.session.user)

    const userLoggedIn = () => {
        if (user) {
            return user && (
                <div className="welcomeBarLoggedIn">
                    <h1>Welcome back, <NavLink to={`/products/current`}>{user.username}</NavLink></h1>
                </div>
            )
        } else {
            return (
                <div className="welcomeBarLoggedOut">
                    <h1>Incredible style and decor, plus one-of-a-kind gifts right this way!
                    </h1>
                </div>
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
        <div className="allProductsContainer">
            {userLoggedIn()}
            <div className="imageContainer white-space">
                {productsArr?.map((product) => (

                    <NavLink to={`/products/${product.id}`} className="productCard" key={product.id}>
                        <img src={product.preview_img} alt="product image" />
                        <div className="productPrice">${Number(product.price).toFixed(2)}</div>
                    </NavLink>

                ))}
            </div>
            <section className="whatIsEtsyContainer">
                <div className="inner">
                    <h2>
                        What is Etsy?
                    </h2>
                    <h3>
                        Support independent creators
                    </h3>
                    <p>
                        There???s no Etsy warehouse ??? just millions of people selling the things they love. We make the whole process easy, helping you connect directly with makers to find something extraordinary.
                    </p>
                    <div><strong>
                        Have a question? Well, we???ve got some answers.
                    </strong>
                    </div>
                    <div className="goToHelpCenter">
                        <button className="goToHelpCenterButton" onClick={() => alert('Feature Coming Soon...')}>Go to Help Center</button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ShowAllProducts
