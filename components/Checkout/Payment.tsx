import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

export default function Payment({
  values,
  handleOnChange,
  validated,
  feedback,
}) {
  const [icon, setIcon] = useState("");
  useEffect(() => {
    setIcon("");
    if (values.cardNumber !== null) {
      if (values.cardNumber[0] == 4) {
        setIcon("/images/visa.png");
      }
      if (values.cardNumber[0] == 5) {
        setIcon("/images/master-card.png");
      }
    }
  }, [values.cardNumber]);
  return (
    <Row>
      <Col>
        <Form noValidate >
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Name on Card</Form.Label>
              <Form.Control
                required
                isInvalid={feedback.nameIsInvalid}
                type="text"
                placeholder="Name on Card"
                name="name"
                defaultValue={values.name}
                onChange={(e) => handleOnChange(e)}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridCardNumber">
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                required
                isInvalid={feedback.cardNumberIsInvalid}
                type="text"
                placeholder="Card Number"
                maxLength={19}
                name="cardNumber"
                value={values.cardNumber}
                onChange={(e) => handleOnChange(e)}
                
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridMonth">
              <Form.Label>Month</Form.Label>
              <Form.Control
                required
                isInvalid={feedback.monthIsInvalid}
                type="text"
                placeholder="Month"
                maxLength={2}
                name="month"
                value={values.month}
                onChange={(e) => handleOnChange(e)}
              />
              <Form.Control.Feedback type="invalid">
                {feedback.monthFeedback}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridYear">
              <Form.Label>Year</Form.Label>
              <Form.Control
                required
                isInvalid={feedback.yearIsInvalid}
                type="text"
                placeholder="Year"
                maxLength={2}
                name="year"
                defaultValue={values.year}
                onChange={(e) => handleOnChange(e)}
              />
              <Form.Control.Feedback type="invalid">
                {feedback.yearFeedback}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCVV">
              <Form.Label>CVV</Form.Label>
              <Form.Control
                required
                isInvalid={feedback.cvvIsInvalid}
                type="text"
                placeholder="CVV"
                maxLength={3}
                name="cvv"
                defaultValue={values.cvv}
                onChange={(e) => handleOnChange(e)}
              />
            </Form.Group>
          </Row>
        </Form>
      </Col>
      <Col>
        <div className="card-template">
          <div className="card">
            <img className="card-chip" src="/images/chip.png" />
            <div className="card-number">{values.cardNumber}</div>
            <div className="card-title">{values.name}</div>
            <div className="expiration-date">
              {values.month}/{values.year}
            </div>
            <img className="card-network" src={icon} />
          </div>
        </div>
      </Col>
    </Row>
  );
}
