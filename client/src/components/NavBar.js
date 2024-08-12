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
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
// 2:14:50 наверное в функцию logOut надо добавить 
// localStorage.removeItem('token')
// иначе по нажатию кнопки выйти, после обновления страницы, пользователь будет в системе все равно, так как токен есть в хранилище
        

    } 
    console.log(user.role)

    return (
        <Navbar expand="lg" className="myapp-navbar">
        <Container fluid>
            <Navbar.Brand className="myapp-navbar-heading" href={SHOP_ROUTE}>devices!</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                {user.isAuth ?
                    <Nav className="ms-auto" style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <>
                            {user.role === 'ADMIN' && ( // Проверяем роль пользователя
                                <Button onClick={() => navigate(ADMIN_ROUTE)} className="admin-navbar">
                                    Админ панель
                                </Button>
                            )}
                            <Button className="logout-navbar" onClick={() => logOut()}>Выйти</Button>
                        </>
                    </Nav>
                :
                    <Nav className="ms-auto" style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Button onClick={() => navigate(LOGIN_ROUTE)} className="myapp-navbar-btns">Авторизация</Button>
                    </Nav>
                }   
            
            </Navbar.Collapse>
            </Container>
        </Navbar>


    )
})

export default NavBar;
