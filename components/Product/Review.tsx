import React from 'react'
import Rating from '../Rating'
export default function Review({review}) {
    return (
        <div className="review">
            <Rating value={review.rating} clickHandler={undefined} size={14}/>
            <small>date</small>
            <div>{review.reviewText}</div>
        </div>
    )
}
