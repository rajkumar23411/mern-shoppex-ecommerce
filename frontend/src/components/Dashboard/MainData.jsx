import React from 'react'
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement,
} from "chart.js"
import { useSelector } from 'react-redux';
const MainData = ({ products, orders, users }) => {
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement);
    const categories = [
        "Jeans",
        "Trouser",
        "Shirt",
        "TShirt",
        "Footware",
        "EyeWare",
    ];
    const statuses = ['Processing', 'Shipped', 'Delivered'];
    const { user } = useSelector(state => state.user);
    let outOfStock = 0;
    let totalIncome = 0;

    orders && orders.forEach((order) => {
        totalIncome += order.totalPrice;
    })
    products &&
        products.forEach(element => {
            if (element.stock === 0) {
                outOfStock += 1;
            }
        });
    const months = ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    const date = new Date();
    const lineState = {
        labels: months,
        datasets: [
            {
                label: `Sales in ${date.getFullYear() - 2}`,
                borderColor: '#8A39E1',
                backgroundColor: '#8A39E1',
                data: months.map((m, i) => orders && orders.filter((od) => new Date(od.createdAt).getMonth() === i && new Date(od.createdAt).getFullYear() === date.getFullYear() - 2).reduce((total, od) => total + od.totalPrice, 0)),
            },
            {
                label: `Sales in ${date.getFullYear() - 1}`,
                borderColor: 'orange',
                backgroundColor: 'orange',
                data: months.map((m, i) => orders && orders.filter((od) => new Date(od.createdAt).getMonth() === i && new Date(od.createdAt).getFullYear() === date.getFullYear() - 1).reduce((total, od) => total + od.totalPrice, 0)),
            },
            {
                label: `Sales in ${date.getFullYear()}`,
                borderColor: '#4ade80',
                backgroundColor: '#4ade80',
                data: months.map((m, i) => orders && orders.filter((od) => new Date(od.createdAt).getMonth() === i && new Date(od.createdAt).getFullYear() === date.getFullYear()).reduce((total, od) => total + od.totalPrice, 0)),
            },
        ],
    };
    const barState = {
        labels: categories,
        datasets: [
            {
                label: "Products",
                borderColor: '#9333ea',
                backgroundColor: '#9333ea',
                hoverBackgroundColor: '#6b21a8',
                data: categories.map((cat) => products && products.filter((item) => item.category === cat).length),
            },
        ],
    };
    const doughnutState = {
        labels: ['Out of Stock', 'In Stock'],
        datasets: [
            {
                backgroundColor: ['#ef4444', '#22c55e'],
                hoverBackgroundColor: ['#dc2626', '#16a34a'],
                data: [outOfStock, products.length - outOfStock],
            },
        ],
    };
    const pieState = {
        labels: statuses,
        datasets: [
            {
                backgroundColor: ['#9333ea', '#facc15', '#4ade80'],
                hoverBackgroundColor: ['#a855f7', '#fde047', '#86efac'],
                data: statuses.map((status) => orders && orders.filter((item) => item.orderStatus === status).length),
            },
        ],
    };

    return (
        <div>
            <div className="dashboard-header">
                <div><p>Dashboard</p></div>
                <div>
                    <div className="profile-img">
                        <img src={user && user.avatar.url} alt="avatar" />
                    </div>
                    <div className="profile-info">
                        <p>{user && user.name}</p>
                        <span>{user && user.role}, <small>Shoppex</small></span>
                    </div>
                </div>
            </div>
            <div className="product-order-user">
                <div className="totalincome">
                    <span className='header'>Total earning:</span>
                    <span className='value'>₹{totalIncome.toLocaleString()}</span>
                </div>
                <div className="product">
                    <span className="header">Product</span>
                    <span className="value"><i className="fa-duotone fa-boxes-stacked"></i>&nbsp;{products.length && products.length}</span>
                </div>
                <div className="order">
                    <span className="header">Orders</span>
                    <span className="value"><i className="fa-duotone fa-bags-shopping"></i>&nbsp;{orders && orders.length}</span>
                </div>
                <div className="user">
                    <span className="header">Users</span>
                    <span className="value"><i className="fa-duotone fa-users"></i>&nbsp;{users && users.length}</span>
                </div>
            </div>
            <div className="first-charts">
                <div className="lineChart">
                    <Line data={lineState}></Line>
                    <div>Sales Statistics</div>
                </div>
                <div className="pieChart">
                    <Pie data={pieState} />
                    <div>Order Status</div>
                </div>
            </div>
            <div className="second-charts">
                <div className="barChart">
                    <Bar data={barState} />
                    <div>Products Statistics</div>
                </div>
                <div className="doughnutChart">
                    <Doughnut data={doughnutState} />
                    <div>Product Stock Status</div>
                </div>
            </div>
        </div>
    )
}

export default MainData