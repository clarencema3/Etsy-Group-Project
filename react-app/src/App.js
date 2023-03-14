import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import AllProducts from "./components/AllProducts"
import SingleProduct from "./components/SingleProduct";
import NewProductForm from "./components/NewProductForm";
import SellersProducts from "./components/SellersProducts";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <AllProducts />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/products/new">
            <NewProductForm />
          </Route>
          <Route path="/products/current">
            <SellersProducts />
          </Route>
          <Route path="/products/:productId">
            <SingleProduct />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/orders">
            <Orders />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
