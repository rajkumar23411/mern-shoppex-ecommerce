import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import DashboardLoader from './DashboardLoader';

const ProductStatistics = () => {
    const { loading, products } = useSelector(state => state.products);
    return (
        <div className="product-staticstics">
            {
                loading ?
                    <DashboardLoader />
                    : (
                        <>
                            <Link to="/admin/all/products">
                                <div className="productBox" style={{ "background": "#1abc9c" }}>
                                    <div className="header">Total Products: </div>
                                    <div className='value'><i className="fa-duotone fa-boxes-stacked"></i>&nbsp;{products && products.length}</div>
                                </div>
                            </Link>
                            <div className="same-row">
                                <div className='productBox' style={{ "background": "#2ecc71" }}>
                                    <div className="header">Jeans: </div>
                                    <div className="value"><i className="fa-duotone fa-child-reaching"></i>&nbsp;{products.filter((item) => item.category === "Jeans").length}</div>
                                </div>
                                <div className='productBox' style={{ "background": "#3498db" }}>
                                    <div className="header">Trouser: </div>
                                    <div className="value"><i className="fa-duotone fa-user-tie"></i>&nbsp;{products.filter((item) => item.category === "Trouser").length}</div>
                                </div>
                                <div className='productBox' style={{ "background": "#8e44ad" }}>
                                    <div className="header">Shirt:</div>
                                    <div className="value"><i className="fa-duotone fa-shirt"></i>&nbsp;{products.filter((item) => item.category === "Shirt").length}</div>
                                </div>
                            </div>
                            <div className="same-row">
                                <div className='productBox' style={{ "background": "#f1c40f" }}>
                                    <div className="header">t-shirt:</div>
                                    <div className="value"><i className="fa-duotone fa-shirt"></i>&nbsp;{products.filter((item) => item.category === "TShirt").length}</div>
                                </div>
                                <div className='productBox' style={{ "background": "#e67e22" }}>
                                    <div className="header">Footware: </div>
                                    <div className="value"><i className="fa-duotone fa-shoe-prints"></i>&nbsp;{products.filter((item) => item.category === "Footware").length}</div>
                                </div>
                                <div className='productBox' style={{ "background": "#e74c3c" }}>
                                    <div className="header">EyeWare: </div>
                                    <div className="value"><i className="fa-duotone fa-glasses"></i>&nbsp;{products.filter((item) => item.category === "EyeWare").length}</div>
                                </div>
                            </div>
                        </>
                    )
            }
        </div>
    )
}

export default ProductStatistics