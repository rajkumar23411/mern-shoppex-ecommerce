import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { formatDate } from '../functions';
import { myOrders } from '../redux/actions/orderAction';

const RecentOrder = () => {
    const { orders, loading } = useSelector(state => state.myOrder);
    const { isAuthenticated } = useSelector(state => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(myOrders());
    }, [dispatch])

    const recentOrder = orders && orders[orders.length - 1];
    return (
        isAuthenticated && orders && orders.length !== 0 &&
        <div className='recentOrders'>
            <div className="recentOrderContent">
                <div className="header">
                    <h2>Recently Ordered</h2>
                    <Link to={`/order/${recentOrder._id}`}><p>View Order</p></Link>
                </div>
                {
                recentOrder.orderItems.map((order, i) => (
                    <div className="recentOrderBox" key={i}>
                        <div className="recent-order-image">
                            <img src={order.image} alt="order item" />
                        </div>
                        <div className="recent-order-details">
                            <div className='recentOrderStatus'>
                                <span>{recentOrder.orderStatus}</span>
                                <p>
                                    <span>Ordered On</span>
                                    <span>{formatDate(recentOrder.createdAt)}</span>
                                </p>
                            </div>
                            <div className='recentOrder-name-quantity'>
                                <span>{order.name}</span>
                                <span>Quantity: {order.quantity}</span>
                            </div>
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default RecentOrder