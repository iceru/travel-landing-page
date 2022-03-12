import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

import Filter from "../../components/Filter";
import image from "../../assets/images/example-1.jpg";

import "./style.scss";

const Products = () => {
  return (
    <div className="container products">
      <div className="titlePage">Search</div>
      <Filter />
      <div className="d-flex justify-content-between productsOption">
        <div>Rate</div>
        <div className="d-flex sort">
          <div className="text">Sort by:</div>
          <Form.Select>
            <option>Name</option>
            <option>Price</option>
          </Form.Select>
        </div>
      </div>
      <div className="productItems">
        <Row>
          <Col xs={12} lg={4}>
            <div className="item">
              <div className="image">
                <img src={image} alt="title" />
              </div>
              <div className="title">Accommodation OR test ONE</div>
              <div className="address">address line 1, Nara, 123123</div>
              <div className="price">From ¥5,000</div>
              <div className="desc">
                Soni village is located at the northeastern end of Nara
                Prefecture, and the beautiful scenery of the rare columnar
                joints is designated as a national natural monument.
              </div>
              <div className="buttonWrapper">
                <Button className="w-100" variant="primary">
                  View
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Products;
