import React, { useState, useEffect } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import Rating from "../../components/Rating";
import {
  AddReview,
  getReview,
  UpdateReview,
  DeleteReview,
} from "../../data/reviews";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { logout } from "../../redux/userReducer";
import { addNotification } from "../../redux/notificationReducer";
const initialReview = {
  productId: null,
  rating: null,
  reviewId: null,
  reviewText: null,
  userId: null,
};
let _rating = "";
let _reviewText = "";
export default function ReviewModal({ show, onHide, product, user }) {
  const [review, setReview] = useState(initialReview);
  const [disabled, setDisabled] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    if (show) {
      check();
    }
    return () => {
      setReview(initialReview);
      check();
    }
  }, [show]);
  
  const check = async () => {
    const r = await getReview(user, product.productId);
    if (r !== false) {
      _rating = r.rating;
      _reviewText = r.reviewText;

      setReview(r);
    }
  };
  const submitHandler = () => {
    if (review.reviewId === null) {
      if (
        AddReview(
          user,
          product.productId,
          review.reviewText,
          review.rating,
          dispatch,
          logout,
          router
        )
      ) {
        onHide();
        dispatch(
          addNotification({
            notification: "Review Submitted",
            variant: "success",
            lifeSpan: 3000,
          })
        );
      } else
        dispatch(
          addNotification({
            notification: "Error While Submitting",
            variant: "danger",
            lifeSpan: 3000,
          })
        );
    } else {
      if (UpdateReview(user, review, dispatch, logout, router)) {
        onHide();
        dispatch(
          addNotification({
            notification: "Updated",
            variant: "success",
            lifeSpan: 3000,
          })
        );
      } else
        dispatch(
          addNotification({
            notification: "Update Failed",
            variant: "danger",
            lifeSpan: 3000,
          })
        );
    }
  };
  const deleteHandler = async () => {
    if(await DeleteReview(
      user,
      review.reviewId,
      dispatch,
      logout,
      router
    ))
    {
      dispatch(addNotification({notification:"Review Deleted",variant:"warning",lifeSpan:3000}))
      onHide()
    }
    else{
      dispatch(addNotification({notification:"Delete Failed",variant:"danger",lifeSpan:3000}))
      
    }
  };
  const setRating = (rating) => {
    let temp = review;
    temp.rating = rating;
    if (rating == _rating) {
      setDisabled(true);
    } else setDisabled(false);
    setReview({ ...temp });
  };
  const onChangeHandler = (value) => {
    let temp = review;
    temp.reviewText = value;
    if (value === _reviewText) {
      setDisabled(true);
    } else {
      if (review.rating === null) {
        setDisabled(true);
      } else setDisabled(false);
    }
    setReview(temp);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {product.productTitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">Rating</div>
        <Rating value={review.rating} clickHandler={setRating} size={20} />
        <Form onSubmit={() => submitHandler()}>
          <Row className="my-3">
            <Form.Group controlId="formGridName">
              <Form.Label>Review</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter your review. (Optional)"
                name="name"
                defaultValue={review.reviewText}
                onChange={(e) => onChangeHandler(e.target.value)}
              />
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="primary"
          type="submit"
          disabled={disabled}
          onClick={() => submitHandler()}
        >
          {review.reviewId !== null ? "Update" : "Save"}
        </Button>
        {review.reviewId !== null ? (
          <Button
            variant="danger"
            type="button"
            onClick={() => deleteHandler()}
          >
            Delete
          </Button>
        ) : null}
        <Button variant="danger" type="button" onClick={onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
