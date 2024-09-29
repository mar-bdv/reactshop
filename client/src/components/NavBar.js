import React, { useContext, useEffect } from "react";
import { Context } from "..";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import Button from 'react-bootstrap/Button';
import { observer } from "mobx-react-lite"
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';  


const NavBar = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            user.setUser(decodedToken);  
            user.setRole(decodedToken.role); 
            user.setIsAuth(true);  
        } else {
            user.setIsAuth(false); 
            user.setRole(null); 
        }
    }, [user]);

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        user.setRole(null);
        localStorage.removeItem('token');
    };

    return (
        <Navbar expand="lg" className="myapp-navbar">
            <Container fluid>
                <Navbar.Brand className="myapp-navbar-heading" href={SHOP_ROUTE}>dream space!</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    {user.isAuth ? (
                        <Nav className="ml-auto navbar-btn" style={{ color: 'white' }}>
                            {user.role === "ADMIN" && (
                                <Button
                                    variant={"outline-light"}
                                    className="navbar-btn-three"
                                    onClick={() => navigate(ADMIN_ROUTE)}
                                >
                                    Админ панель
                                </Button>
                            )}
                            <Button
                                variant={"outline-light"}
                                onClick={() => logOut()}
                                className="ml-2 navbar-btn navbar-btn-three"
                            >
                                Выйти
                            </Button>
                            <Button
                                variant={"outline-light"}
                                onClick={() => navigate(BASKET_ROUTE)}
                                className="ml-2 navbar-btn basket-btn navbar-btn-three"
                            >
                                Корзина
                            </Button>
                        </Nav>
                    ) : (
                        <Nav className="ml-auto navbar-btn" style={{ color: 'white' }}>
                            <Button variant={"outline-light"} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
});

export default NavBar;
