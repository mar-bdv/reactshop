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
            user.setUser(decodedToken);  // Сохраняем пользователя из токена
            user.setRole(decodedToken.role);  // Сохраняем роль
            user.setIsAuth(true);  // Устанавливаем, что пользователь авторизован
        } else {
            user.setIsAuth(false);  // Если токена нет, не авторизован
            user.setRole(null);  // Очищаем роль
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


// // НАЧАЛО мой изначально работающий код. В том числе и роли работают тут!
// // navbar, здесь также навигация на авторизацию , админ панель, и на log out
// const NavBar = observer(() => {
//     const { user } = useContext(Context);
//     const navigate = useNavigate();

//     const logOut = () => {
//         user.setUser({});
//         user.setIsAuth(false);
//         user.setRole({})
//         // 2:14:50 наверное в функцию logOut надо добавить  
//         // также, добавить user.setRole({})
//         // localStorage.removeItem('token')
//         // иначе по нажатию кнопки выйти, после обновления страницы, пользователь будет в системе все равно, так как токен есть в хранилище
//         localStorage.removeItem('token')
//     } 
//     const token = localStorage.getItem('token');
//     let userRole = '';
    
//     if (token) {
//         const decodedToken = jwtDecode(token);
//         userRole = decodedToken.role;
//     }


//     console.log("NAVBAR", user.isAuth, user.role, user, userRole)

//     return (
//         <Navbar expand="lg" className="myapp-navbar">
//         <Container fluid>
//             <Navbar.Brand className="myapp-navbar-heading" href={SHOP_ROUTE}>dream space!</Navbar.Brand>
//             <Navbar.Toggle aria-controls="navbarScroll" />
//             <Navbar.Collapse id="navbarScroll">

//                 {/* ниже есть код, который был изначально, он закомментирован */}
//                 {user.isAuth ? (
//                     <Nav className="ml-auto navbar-btn" style={{ color: 'white' }}>
//                         {userRole === "ADMIN" && (
//                             <Button
//                                 variant={"outline-light"}
//                                 onClick={() => navigate(ADMIN_ROUTE)}
//                             >
//                                 Админ панель
//                             </Button>
//                         )}
//                         <Button
//                             variant={"outline-light"}
//                             onClick={() => logOut()}
//                             className="ml-2 navbar-btn"
//                         >
//                             Выйти
//                         </Button>
//                     </Nav>
//                 ) : (
//                     <Nav className="ml-auto navbar-btn" style={{ color: 'white' }}>
//                         <Button variant={"outline-light"} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
//                     </Nav>
//                 )}

//             {/* 
//                 {user.isAuth ?
//                         <Nav className="ml-auto navbar-btn" style={{color: 'white'}}>
//                             <Button
//                                 variant={"outline-light"}
//                                 onClick={() => navigate(ADMIN_ROUTE)}
//                             >
//                                 Админ панель
//                             </Button>
//                             <Button
//                                 variant={"outline-light"}
//                                 onClick={() => logOut()}
//                                 className="ml-2 navbar-btn"
//                             >
//                                 Выйти
//                             </Button>
//                         </Nav>
//                         :
//                         <Nav className="ml-auto navbar-btn" style={{color: 'white'}}>
//                             <Button variant={"outline-light"} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
//                         </Nav>
//                     }  */}
//             </Navbar.Collapse>
//             </Container>
//         </Navbar>


//     )
// })

// export default NavBar;
// // Конец мой изначально работающий код. В том числе и роли работают тут!

                /* {user.isAuth ?
                        <Nav className="ml-auto navbar-btn" style={{color: 'white'}}>
                            <Button
                                variant={"outline-light"}
                                onClick={() => navigate(ADMIN_ROUTE)}
                            >
                                Админ панель
                            </Button>
                            <Button
                                variant={"outline-light"}
                                onClick={() => logOut()}
                                className="ml-2 navbar-btn"
                            >
                                Выйти
                            </Button>
                        </Nav>
                        :
                        <Nav className="ml-auto navbar-btn" style={{color: 'white'}}>
                            <Button variant={"outline-light"} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                        </Nav>
                    } */
/* {user.isAuth ?
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
                }    */