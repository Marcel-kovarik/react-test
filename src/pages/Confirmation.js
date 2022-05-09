import React, {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { productsPurchased } from '../store/cart';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function Confirmation() {
    const products = useSelector(main => main.products.products);
    const cartItems = useSelector(main => main.cart.items);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if(!location.state){
            navigate('/');
        }
    }, []);

    const handleClickPurchased = () => {
        dispatch(productsPurchased());
        navigate('/');
    }

    var totalPrice = 0;

    return <div>
        <Alert variant="primary" className="mb-3">
            <Alert.Heading>Do you want to buy these items?</Alert.Heading>
            { cartItems.map(item => {
                const product = products.find(ele => ele.id === item.productId);
                totalPrice += (product.price-item.discount)*item.count;
                return (
                   <Row>
                        <Col md={2} xs={3}>
                            {product.name}
                        </Col>
                        <Col md={2} xs={3}>
                            ${product.price-item.discount}
                        </Col>
                        <Col md={1} xs={2}>
                            {item.count}
                        </Col>
                        <Col md={2} xs={4}>
                            ${Math.round((product.price-item.discount)*item.count*100)/100}
                        </Col>
                    </Row>
                )
            })}
            <hr className="text-black-50 my-2"></hr>
            <Row className="fw-bold">
                <Col md={5} xs={8} className="text-end">
                    Total Price
                </Col>
                <Col md={2} xs={4}>
                    ${Math.round(totalPrice*100)/100}
                </Col>
            </Row>
        </Alert>
        <Button variant="primary" onClick={handleClickPurchased}>
            Payment Confirm
        </Button>

    </div>;
}
