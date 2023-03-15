import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../../store/orders";
import Orders from "../Orders"
import "./SuccessfulPurchasePage.css";

function SuccessfulPurchasePage() {




    return (
        <div className="success-page-container">
            <div className="success-message">
                <h1>Order Successfully Placed!</h1>
                <h3>View all your orders below:</h3>
            </div >
            <div>
                <Orders />
            </div>
        </div>
  );
}

export default SuccessfulPurchasePage;
