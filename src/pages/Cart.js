import React, { useState }from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity, removeProduct, applyVoucher } from '../store/cart';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';

export default function Cart() {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector(main => main.cart.items);
    const products = useSelector(main => main.products.products);
    const [show, setShow] = useState(false);
    const [coupon, setCoupon] = useState('');
    const [couponProductId, setCouponProductId] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = (productId) => {
        setCouponProductId(productId);
        setShow(true);
    }

    const addCount = (productId) => {
        dispatch(updateQuantity({status : 'add', productId: productId}));
    }

    const removeCount = (productId) => {
        dispatch(updateQuantity({status : 'remove', productId: productId}));
    }

    const removeCartItem = (productId) => {
        dispatch(removeProduct(productId));
    }

    const applyCoupon = (productId) => {
        if(coupon!=''){
            const product = products.find(item => item.id === productId);
            const voucher = product.vouchers.find(item => item.name === coupon);
            if(voucher){
                dispatch(applyVoucher({productId: productId, discount: voucher.discount }));
            }
            setShow(false);
        }
    }

    const onSubmit = (data) => {
        navigate('/confirmation',{state:data});
    }

    return (
        <>
            <Card
                className="w-75 rounded-full border-0"
                style={{ margin: 'auto', background: '#f3f3f3' }}
            >
                <Card.Body className="p-3 p-lg-5">
                    <Card.Title>Shopping cart</Card.Title>

                    <ListGroup as="ol" style={{ marginTop: '1rem' }}>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start border-0 p-0"
                        >
                            <Container fluid="md" className="p-2">
                                {   cartItems.length>0 ?
                                    cartItems.map((item, index) => {
                                        const product = products.find(ele => ele.id === item.productId);
                                        return (
                                            <React.Fragment key={product.id}>
                                                { index > 0 && <hr className="text-black-50 my-2"></hr> }
                                                <Row className="py-2 m-0">
                                                    <Col md={1} xs={6}>
                                                        <Image
                                                            style={{ maxHeight: '6rem' }}
                                                            className="d-block mx-auto"
                                                            src={product.image}
                                                            fluid
                                                            rounded
                                                        />
                                                    </Col>
                                                    <Col
                                                        className="d-flex flex-column justify-content-center"
                                                        md={3}
                                                        xs={6}
                                                    >
                                                        <h6 className="mb-0">
                                                            {product.name}
                                                        </h6>
                                                        <small
                                                            style={{ fontSize: '0.7rem' }}
                                                        >
                                                            <span className="text-black-50 my-2">
                                                                Product Code:
                                                            </span>{' '}
                                                            <span
                                                                style={{
                                                                    fontWeight: '500',
                                                                }}
                                                            >
                                                                SDSIJ389
                                                            </span>
                                                        </small>
                                                    </Col>
                                                    <Col
                                                        className="d-flex justify-content-center align-items-center"
                                                        md={2}
                                                        xs={6}
                                                    >
                                                        <h6 className="mb-0 me-2 text-danger">
                                                            ${product.price-item.discount}
                                                        </h6>
                                                        {item.discount>0 &&
                                                            <h6 className="mb-0 text-black-50">
                                                                <strike>${product.price}</strike>
                                                            </h6>
                                                        }
                                                    </Col>
                                                    <Col
                                                        className="d-flex justify-content-center align-items-center py-2"
                                                        md={2}
                                                        xs={6}
                                                    >
                                                        <InputGroup
                                                            size="sm"
                                                            style={{ width: '5rem' }}
                                                        >
                                                            <Button
                                                                variant="outline-secondary"
                                                                style={{
                                                                    fontSize: '0.6rem',
                                                                }}
                                                                onClick={() => addCount(item.productId)}
                                                            >
                                                                <i className="fa fa-plus"></i>
                                                            </Button>
                                                            <Form.Control
                                                                size="sm"
                                                                className="border-secondary text-center px-0"
                                                                style={{
                                                                    fontSize: '0.7rem',
                                                                }}
                                                                value={item.count}
                                                                readOnly
                                                            />
                                                            <Button
                                                                variant="outline-secondary"
                                                                style={{
                                                                    fontSize: '0.6rem',
                                                                }}
                                                                onClick={() => removeCount(item.productId)}
                                                            >
                                                                <i className="fa fa-minus"></i>
                                                            </Button>
                                                        </InputGroup>
                                                    </Col>
                                                    <Col
                                                        className="d-flex justify-content-center align-items-center"
                                                        md={2}
                                                        xs={6}
                                                    >
                                                        <Button
                                                            size="sm"
                                                            variant="secondary"
                                                            onClick={() => handleShow(item.productId)}
                                                            className={product.vouchers.length === 0 && `d-none`}
                                                        >
                                                            Apply Coupon
                                                        </Button>
                                                    </Col>
                                                    <Col
                                                        className="d-flex justify-content-center align-items-center"
                                                        md={2}
                                                        xs={6}
                                                    >
                                                        <Button variant="danger" size="sm" onClick={() => removeCartItem(item.productId)}>
                                                            Remove
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </React.Fragment>
                                        )
                                    })
                                    :
                                    <div className='text-center'>No Product in cart</div>
                                }
                                
                            </Container>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>

                <Card.Body className="p-lg-5 p-3">
                    <Card.Title>Billing Information</Card.Title>

                    <Form className="bg-white p-3" onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                        >
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                {...register("name",{ required: true })}
                                type="text"
                                placeholder="Enter Name"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                {...register("email",{ required: true })}
                                type="email"
                                placeholder="Enter email"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                {...register("phone",{ required: true, pattern: /^\+\d+\s?\d{2}\s?\d{3}\s?\d{2}$/i })}
                                type="text"
                                placeholder="Enter Phone"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Country</Form.Label>
                            <Form.Select
                                {...register("country",{ required: true })}
                            >
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                {...register("city",{ required: true })}
                                type="text"
                                placeholder="Enter City"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                {...register("address",{ required: true })}
                                type="text"
                                placeholder="Enter Address"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>ZIP</Form.Label>
                            <Form.Control
                                {...register("zip",{ required: true })}
                                type="text"
                                placeholder="Enter ZIP"
                            />
                        </Form.Group>
                        <Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            className="w-100 mb-3"
                        >
                            Next
                        </Button>
                        </Form.Group>
                    </Form>
                </Card.Body>

            </Card>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Product Coupon</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control
                            type="text"
                            placeholder="Enter coupon code"
                            value={coupon}
                            onChange={(e) => setCoupon(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => applyCoupon(couponProductId)}>
                        Apply Coupon
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
