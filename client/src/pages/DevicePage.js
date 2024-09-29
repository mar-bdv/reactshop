import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import bigStar from '../assets/bigStar.png';
import { useParams } from 'react-router-dom';
import { fetchOneDevice } from '../http/deviceAPI';
import { addToBasket } from '../http/deviceAPI'
import { getUserIdFromToken } from '../http/userAPI';

// страница для описания товара ( по id )


const DevicePage = () => { 
    
    const [device, setDevice] = useState({info: []});
    const {id} = useParams();
    useEffect(() => {
        try {
            fetchOneDevice(id).then(data => setDevice(data))

        } catch (error) {
            console.log(error, "ошибка в Device Page")
        }
    }, [id]); 

    
     //NEW CODE
        const handleAddToBasket = async () => {
            const userId = getUserIdFromToken(); // Получаем userId из токена
            if (!userId) {
                alert('Чтобы добавить товар в корзину, войдите в аккаунт!');
                return;
            }
            try {
                await addToBasket(userId, device.id);
                alert('Товар добавлен в корзину');
            } catch (error) {
                console.log(error);
                alert('Ошибка при добавлении товара в корзину');
            }
        };
    // NEW CODE
    

    return (
        <Container className="mt-3 container-custom">
            <Row className='img-name-device'>
                <Col md={4} className="col-device-image">
                <Image 
                className='device-image'
                src={process.env.REACT_APP_API_URL + device.img} />
                </Col>
                <Col md={4}>
                <Card className="device-card">
                    <h2 className='devicepage_name'>{device.name}</h2>
                    <h3 className='devicepage_price'>{device.price}  ₽</h3>
                    {/* <div
                    className="d-flex justify-content-center"
                    >
                        {device.rating}
                    </div> */}
                    <Button className='device-card_btn' onClick={handleAddToBasket}>Добавить в корзину</Button>
                </Card>
                </Col>
            </Row>
            <Row className="device-specs">
                <h2>Описание:</h2>
                {device.info.map((info, index) => (
                    <>
                        <Row key={info.id} className="spec-row">
                            <span key={info.id}> 
                                <span className='spec-row__span'>{info.title}: </span> 
                                <span>{info.description}</span>
                            </span>
                        </Row>
                    <hr/>

                    </>
                ))}
            </Row>
        </Container>

    );
};

export default DevicePage;