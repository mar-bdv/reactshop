import React, {useContext, useState} from 'react';
import {Col, Container, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";


const Auth = observer(() => {


    const {user} = useContext(Context)
    const location = useLocation()
    const history = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                // eslint-disable-next-line
                data = await registration(email, password);
            }
            user.setUser(user)
            user.setIsAuth(true)
            history(SHOP_ROUTE)
        } catch (e) {
            // alert(e.response.data.message)
            console.log("ошибочка в Auth");
        }

    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5 myapp-card-bg">
                <h2 className="m-auto myapp-heading">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3 myapp-input-email"
                        placeholder="Введите ваш email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3 myapp-input-password"
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    {/* <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ?
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                            </div>
                        }
                        <Button
                            variant={"outline-success"}
                            onClick={click}
                        >
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </Row> */}
                    <Row className="mt-3 d-flex align-items-center">
                        <Col xs={8} className='myapp-noaccount'>
                            {isLogin ?
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE} className='myapp-noaccount-link'>Зарегистрируйся!</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE} className='myapp-noaccount-link'>Войдите!</NavLink>
                            </div>
                            }
                        </Col>
                        <Col xs={4} className="d-flex justify-content-end align-items-center">
                            <Button
                            className="myapp-registration"
                            onClick={click}
                            >
                            {isLogin ? 'Войти' : 'Регистрация'}
                            </Button>
                        </Col>
                    </Row>

                </Form>
            </Card>
        </Container>
    );
});

export default Auth;