import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import SingleWishListItem from '../components/SingleWishListItem'

const WishList = () => {
    const { wishlistItems } = useSelector((state) => state.wishlist);
    return (
        <>
            <Navbar />
            {
                wishlistItems.length === 0 ? (
                    <div className="emtpy-wishlist">
                        <img src="/empty-wishlist.jpg" alt="empty-wishlist" />
                        <h2>Your wishlist is empty!</h2>
                        <Link to="/products"><button>Shop Now</button></Link>
                    </div>
                ) : (
                    <div className="wishlistPage">
                        <h2>MY WISHLIST {wishlistItems.length > 0 && (
                            <>
                                ({wishlistItems.length})
                            </>
                        )}</h2>
                        <div className="wishlistItems">
                            {wishlistItems && wishlistItems.map((item) => (
                                <SingleWishListItem key={item.product} item={item} />
                            ))}
                        </div>
                    </div>
                )
            }
            <Footer />
        </>
    )
}

export default WishList