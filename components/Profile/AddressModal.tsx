import React, { useState, useEffect } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

const initialAddressValues = {
  addressId: "",
  userId: "",
  name: "",
  phoneNumber: "",
  detail: "",
  neighbourhood: "",
  district: "",
  city: "",
  title: "",
};
export default function AddressModal({ show, onHide, address, func }) {
  const [addressValues, setAddressValues] = useState(initialAddressValues);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if(show)
    {
      if (address !== null) {
        setAddressValues(address);
      } else {
        setAddressValues(initialAddressValues);
      }
    }
    setValidated(false);
  }, [show]);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    if(address!==null)
    {
      if(isValidated() && address!==addressValues)
      {
        func(addressValues)
      }
      onHide()
      return
    }
    if (isValidated()) {
      func(addressValues);
      onHide();
    }
  };
  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setAddressValues({
      ...addressValues,
      [name]: value,
    });
  };
  const isValidated = () => {
    if (
      addressValues.name === "" ||
      addressValues.detail === "" ||
      addressValues.city === "" ||
      addressValues.district === "" ||
      addressValues.neighbourhood === "" ||
      addressValues.title === "" ||
      addressValues.phoneNumber === ""
    ) {
      return false;
    }
    return true;
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
          {address === null ? "Add New Address" : "Edit Address"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter recipient name"
                name="name"
                defaultValue={addressValues.name}
                onChange={handleInput}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Phone Number"
                maxLength={11}
                name="phoneNumber"
                defaultValue={addressValues.phoneNumber}
                onChange={handleInput}
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control
              required
              placeholder="Street, Apartment, No"
              name="detail"
              defaultValue={addressValues.detail}
              onChange={handleInput}
            />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridNeighbourhood">
              <Form.Label>Neighbourhood</Form.Label>
              <Form.Control
                required
                placeholder="Neighbourhood"
                name="neighbourhood"
                defaultValue={addressValues.neighbourhood}
                onChange={handleInput}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridDistrict">
              <Form.Label>District</Form.Label>
              <Form.Control
                required
                placeholder="District"
                name="district"
                defaultValue={addressValues.district}
                onChange={handleInput}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                required
                placeholder="City"
                name="city"
                defaultValue={addressValues.city}
                onChange={handleInput}
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              placeholder="Title of address"
              name="title"
              defaultValue={addressValues.title}
              onChange={handleInput}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Save
        </Button>

        <Button variant="danger" type="button" onClick={onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
