import React from 'react'
import { useSelector } from 'react-redux';
import { getUser } from '../../redux/userReducer';
import Rating from '../Rating'
export default function Review({review,setShow}) {
    const user = useSelector(getUser);
    console.log(user,review)
    return (
        <div className="review">
            <Rating value={review.rating} clickHandler={undefined} size={14}/>
            <small>{review.date}</small>
            <div>{review.reviewText}</div>
            {review.userId===user.id?<i className="far fa-edit edit-button" onClick={()=>setShow(true)}></i>:null}
        </div>
    )
}
