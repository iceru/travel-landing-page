import React from "react";
import { Row, Col, Button, Form } from "react-bootstrap";

import "./style.scss";

const Filter = () => {
  return (
    <div className="filterWrapper">
      <Row>
        <Col>
          <Form.Control type="text" placeholder="Date" />
        </Col>
        <Col>
          <Form.Select>
            <option>All Categories</option>
            <option>Accomodation</option>
          </Form.Select>
        </Col>
        <Col>
          <Form.Select type="text">
            <option>Price Range</option>
            <option>{"< ¥9.999"}</option>
            <option>{"¥10.000 - ¥14.999"}</option>
          </Form.Select>
        </Col>
        <Col>
          <Form.Control type="text" placeholder="Type Keywords" />
        </Col>
        <Col>
          <Button className="w-100" variant="secondary">
            Search
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Filter;
