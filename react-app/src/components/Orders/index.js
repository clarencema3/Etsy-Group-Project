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

    // util functions for date and total order cost:

    const getDate = (date) => {
        const dateArr = date.split(" ")
        return `${dateArr[2]} ${dateArr[1]}, ${dateArr[3]}`
    }

    const getTotalCost = (order) => {
        let total = 0
        console.log("==============", order)
        for (let i = 0; i < order.length; i++) {
            total += order[i].total_price
        }
        return total
    }

    // -------------------------------------------------

    return (
        <div className="purch-container">
            <div className="purch-container-div">
                <h1 className="purch-header">Purchases</h1>
                <div className="purch-card-container">
                    {purchasesList.map(itemList => (
                        <div key={itemList[0].id} className="purch-card-div">
                            <div className="purch-date-totalcost">
                                <div className="purch-date">
                                    Purchased on {getDate(itemList[0].date)}
                                </div>
                                <div className="purch-totalcost">
                                    Order Total: ${getTotalCost(itemList)}
                                </div>
                            </div>
                            <div className="purch-item-detail-div">
                                {itemList.map(item => (
                                    <div key={item.id} className="purch-item-detail-card">
                                        <div className="purch-img-div">
                                            <img className="purch-img" src={item.product.preview_img} />
                                        </div>
                                        <div className="purch-name-cost-div">
                                            <div className="purch-name-seller-div">
                                                <div className="purch-name">{item.product.product_name}</div>
                                                <div className="purch-seller">Purchased from {item.seller.username}</div>
                                            </div>
                                            <div className="purch-qty-cost">
                                                <div className="purch-qty">Qty x{item.quantity}</div>
                                                <div className="purch-cost">${item.total_price}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Orders
