import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import moment from "moment";
// import axios from "axios";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";

import { Table, Row, Col, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import { countries } from "../../helpers/countries";
// import { OREndpoint } from "../../helpers/endpoints";

import "./style.scss";

/* eslint react/prop-types: 0 */

const SelectInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div>
            <label className="form-label">{label}</label>
            <select className="form-select" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error text-danger">{meta.error}</div>
            ) : null}
        </div>
    );
};

const TextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label className="form-label" htmlFor={props.id || props.name}>
                {label}
            </label>
            {props.as === "textarea" ? (
                <textarea className="text-input form-control" {...field} {...props} />
            ) : (
                <input className="text-input form-control" {...field} {...props} />
            )}
            {meta.touched && meta.error ? (
                <div className="error text-danger">{meta.error}</div>
            ) : null}
        </>
    );
};

const Checkout = () => {
    const { state } = useLocation();
    const { t } = useTranslation();
    const [products, setProducts] = useState();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (state && state.products) {
            setProducts(state.products);
        }
    }, []);

    console.log(products);

    const phoneRegExp =
        /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

    // const getTotalPrice = (req) => {
    //     const price = req.price;
    //     let extrasPrice = 0;

    //     if (req.selectedExtras.length > 0) {
    //         req.selectedExtras.forEach((extra) => {
    //             extrasPrice += extra.TotalCost;
    //         });
    //     }
    //     return price + extrasPrice;
    // };

    const handleSubmit = () => {
        console.log('submit')
    };
    return products ? (
        <div className="checkout container">
            {products.map((product, i) => (
                <div className="mb-3" key={i}>
                    <h5 className="rbTitle mb-3">{product.Name}</h5>
                    <Table bordered responsive className="mb-3">
                        <thead>
                            <tr>
                                <th>{t("product")}</th>
                                <th>{t("options")}</th>
                                <th>{t("totals")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{product.Name}</td>
                                <td>
                                    <div className="mb-3">
                                        {product.Configurations[0].Pax.Adults} Adults
                                    </div>
                                    <div className="mb-3">
                                        {t("check_in")} &nbsp;
                                        {moment(product.Configurations[0].Quotes[0].Commence).format(
                                            "l"
                                        )}
                                    </div>
                                    <div>
                                        {t("check_out")} &nbsp;
                                        {moment(product.Configurations[0].Quotes[0].Conclude).format(
                                            "l"
                                        )}
                                    </div>
                                    <br />
                                </td>
                                <td>¥{product.Configurations[0].Quotes[0].TotalPrice}</td>
                            </tr>
                            {product.selectedExtras &&
                                product.selectedExtras.map((extra, i) => {
                                    return (
                                        <tr key={i}>
                                            <td></td>
                                            <td>{extra.Name}</td>
                                            <td>¥{extra.TotalCost}</td>
                                        </tr>
                                    );
                                })}
                            <tr>
                                <td colSpan={2} className="text-end">
                                    Total
                                </td>
                                <td>¥{product.Configurations[0].Quotes[0].TotalPrice}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            ))}

            <Formik
                initialValues={{
                    specialRequests: "",
                    firstName: "",
                    lastName: "",
                    email: "",
                    conf_email: "",
                    phone: "",
                    mobile: "",
                    address: "",
                    city: "",
                    state: "",
                    zip: "",
                    country: "",
                }}
                validationSchema={Yup.object({
                    firstName: Yup.string().required("Required"),
                    lastName: Yup.string().required("Required"),
                    email: Yup.string()
                        .email("Invalid email address")
                        .required("Required"),
                    conf_email: Yup.string()
                        .oneOf([Yup.ref("email"), null], "Email must match")
                        .required("Required"),
                    phone: Yup.string()
                        .required("Required")
                        .matches(phoneRegExp, "Phone number is not valid"),
                    mobile: Yup.string()
                        .required("Required")
                        .matches(phoneRegExp, "Phone number is not valid"),
                    address: Yup.string().required("Required"),
                    city: Yup.string().required("Required"),
                    state: Yup.string().required("Required"),
                    zip: Yup.string().required("Required"),
                    country: Yup.string().required("Required"),
                })}
                onSubmit={(values) => {
                    setTimeout(() => {
                        handleSubmit(values);
                    }, 400);
                }}
            >
                <Form>
                    <div className="customerDetail">
                        <h4 className="text-center mb-4">{t("customer_detail")}</h4>
                        <Row>
                            <Col xs={12} lg={6}>
                                <div className="mb-3">
                                    <TextInput
                                        label={t("first_name")}
                                        name="firstName"
                                        type="text"
                                        placeholder={t("type_keywords")}
                                    />
                                </div>
                            </Col>
                            <Col xs={12} lg={6}>
                                <div className="mb-3">
                                    <TextInput
                                        label={t("last_name")}
                                        name="lastName"
                                        type="text"
                                        placeholder={t("type_keywords")}
                                    />
                                </div>
                            </Col>
                            <Col xs={12}>
                                <div className="mb-3">
                                    <TextInput
                                        label={t("email")}
                                        name="email"
                                        type="email"
                                        placeholder={t("type_keywords")}
                                    />
                                </div>
                            </Col>
                            <Col xs={12}>
                                <div className="mb-3">
                                    <TextInput
                                        label={t("re_email")}
                                        name="conf_email"
                                        type="text"
                                        placeholder={t("type_keywords")}
                                    />
                                </div>
                            </Col>
                            <Col xs={12} lg={6}>
                                <div className="mb-3">
                                    <TextInput
                                        label={t("phone")}
                                        name="phone"
                                        type="tel"
                                        placeholder={t("type_keywords")}
                                    />
                                </div>
                            </Col>
                            <Col xs={12} lg={6}>
                                <div className="mb-3">
                                    <TextInput
                                        label={t("mobile")}
                                        name="mobile"
                                        type="tel"
                                        placeholder={t("type_keywords")}
                                    />
                                </div>
                            </Col>
                            <Col xs={12}>
                                <div className="mb-3">
                                    <TextInput
                                        label={t("address")}
                                        name="address"
                                        type="text"
                                        as="textarea"
                                        placeholder={t("type_keywords")}
                                    />
                                </div>
                            </Col>
                            <Col xs={12} lg={4}>
                                <div className="mb-3">
                                    <TextInput
                                        label={t("city")}
                                        name="city"
                                        type="text"
                                        placeholder={t("type_keywords")}
                                    />
                                </div>
                            </Col>
                            <Col xs={12} lg={4}>
                                <div className="mb-3">
                                    <TextInput
                                        label={t("state")}
                                        name="state"
                                        type="text"
                                        placeholder={t("type_keywords")}
                                    />
                                </div>
                            </Col>
                            <Col xs={12} lg={4}>
                                <div className="mb-3">
                                    <TextInput
                                        label={t("zip")}
                                        name="zip"
                                        type="text"
                                        placeholder={t("type_keywords")}
                                    />
                                </div>
                            </Col>
                            <Col xs={12}>
                                <div className="mb-4">
                                    <SelectInput label={t("country")} name="country">
                                        <option value="">Select Country</option>
                                        {countries.map((country, i) => (
                                            <option
                                                value={`${country.number}_${country.name}`}
                                                key={i}
                                            >
                                                {country.name}
                                            </option>
                                        ))}
                                    </SelectInput>
                                </div>
                            </Col>
                            <Col xs={12}>
                                <Button className="fw-bold" type="submit">
                                    {t("submit")}
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Form>
            </Formik>
        </div>
    ) : (
        <h4 className="text-center">Page Error</h4>
    );
};

export default Checkout;
