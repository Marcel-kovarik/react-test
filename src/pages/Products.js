import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/product';
import { addProduct } from '../store/cart';
import Pagenation from '../components/Pagenation'

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

export default function Products() {
    const countPerPage = 5;
    const dispatch = useDispatch();
    const products = useSelector( main => main.products.products);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = Math.ceil(products.length/countPerPage)


    useEffect(() => {
      dispatch(fetchProducts()).then(() => setLoading(false));
    }, [dispatch]);

    const handleChangePage = (p) => {
        setCurrentPage(p)
    }

    const addCart= (ind) => {
        dispatch(addProduct(ind));
    }

  
    return (
        <ListGroup as="ol" className="w-75 mx-auto">
            { totalPages>0 &&
                <div className='text-center mb-2'>
                    <Pagenation 
                        currentPage={currentPage} 
                        totalPages={totalPages}
                        handleChangePage={handleChangePage}
                    />
                </div>
            }

            { products.slice((currentPage-1)*countPerPage, currentPage*countPerPage).map(item => {
                return (
                    <ListGroup.Item as="li" className="p-3" key={item.id}>
                        <Row>
                            <Col md={2}>
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fluid
                                    rounded
                                />
                            </Col>
                            <Col md={10} className="d-flex flex-column justify-content-center">
                                <h5 className="mt-0 font-weight-bold mb-2">{item.name}</h5>
                                <p className="font-italic text-muted mb-0 small mb-3">
                                    {item.short_description}
                                </p>
                                <div className="d-flex align-items-center justify-content-between mt-1">
                                    <h6 className="font-weight-bold my-2">${item.price}</h6>
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        style={{
                                            fontSize: '0.7rem',
                                        }}
                                        onClick={() => addCart(item.id)}
                                    >
                                        Add to Cart
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                )
            })}

            { totalPages>0 &&
                <div className='text-center mt-2'>
                    <Pagenation 
                        currentPage={currentPage} 
                        totalPages={totalPages}
                        handleChangePage={handleChangePage}
                    />
                </div>
            }
            
        </ListGroup>
    );
}
