import React, { useContext } from "react";
import { Context } from "..";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import Button from 'react-bootstrap/Button';
import { observer } from "mobx-react-lite"
import { useNavigate } from "react-router-dom";


const NavBar = observer(() => {
    const {user} = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
    } 

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
            <Navbar.Brand  href={SHOP_ROUTE}>КупиДевайс</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                {user.isAuth ?
                <Nav className="ml-auto" style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <Button 
                        onClick={() => navigate(ADMIN_ROUTE )}>
                            Админ панель
                    </Button>
                    <Button 
                        onClick={() => logOut()}>
                            Выйти
                    </Button>
                </Nav>
                :
                <Nav className="ml-auto" style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <Button onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                </Nav>
                }   
            
            </Navbar.Collapse>
            </Container>
        </Navbar>
    )
})

export default NavBar;
