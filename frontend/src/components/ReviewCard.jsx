import React from 'react'
import {Rating} from "@material-ui/lab"
const ReviewCard = ({review}) => {
      const options = {
            value: review && review.rating,
            size: "small",
            precision: 0.5,
            readOnly: true
          };
  return (
      
    <div className='reviewCard'>
      <div>
            <img src="https://i0.wp.com/artvoice.com/wp-content/uploads/2018/03/blank-profile-picture-973460_960_720.png?ssl=1" alt="profile" className='profileIcon'/>
      </div>
      <div>
            <div className="nameReview">
                 <h5> {review.name}</h5>
                  <Rating {...options} />
            </div>
            <div className="comment">{review.comment}</div>
      </div>
    </div>
  )
}

export default ReviewCard