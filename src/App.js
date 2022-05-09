import { Routes, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Cart from './pages/Cart';
import Products from './pages/Products';
import Confirmation from './pages/Confirmation';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import './App.css';

function App() {
    const cartItems = useSelector( main => main.cart.items )
    const carItemsCount = cartItems.length;
    return (
        <>
            <Navbar bg="light" variant="light" className="py-3">
                <Container>
                    <Nav className="me-auto">
                        <Link
                            to="/"
                            className="text-decoration-none text-secondary"
                        >
                            Products
                        </Link>
                    </Nav>
                    <Nav>
                        <Link
                            to="/cart"
                            className="text-decoration-none text-secondary position-relative"
                        >
                            <i className="fa fa-shopping-cart"></i> Cart
                            { carItemsCount>0 && <span className = 'cartCount'>{carItemsCount}</span>}
                        </Link>
                    </Nav>
                </Container>
            </Navbar>

            <Container className="py-3 py-lg-5">
                <Routes>
                    <Route path="/" element={<Products />} exact />
                    <Route path="/cart" element={<Cart />} exact />
                    <Route
                        path="/confirmation"
                        element={<Confirmation />}
                        exact
                    />
                </Routes>
            </Container>
        </>
    );
}

export default App;
