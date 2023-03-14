import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../../store/orders";
import "./orders.css"

function Orders() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user);
    const purchases = useSelector((state) => state.orders.purchases)

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    if (!purchases) {
        return <h1>Loading...</h1>
    }

    const purchasesList = Object.values(purchases)
    console.log(purchasesList)

    const getDate = (date) => {
        const dateArr = date.split(" ")
        console.log()
        return dateArr
    }

    return (
        <div className="purch-container">
            <div className="purch-container-div">
                <h1 className="purch-header">Purchases</h1>
                {purchasesList.map(itemList => (
                    <div key={itemList[0].id} className="purch-card-div">
                        <div>
                            Purchased on {getDate(itemList[0].date)}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Orders
