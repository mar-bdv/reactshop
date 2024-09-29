import React from 'react';
import { Button, Card, Col, Image } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import { DEVICE_ROUTE } from '../utils/consts';
import { getUserIdFromToken } from '../http/userAPI';
import { addToBasket } from '../http/deviceAPI';

const DeviceItem = ({device}) => { 
    
    const navigate = useNavigate();

    const handleAddToBasket = async () => {
        const userId = getUserIdFromToken(); 
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

    return (
        <Col className='mb-4'>
            <Card
                className='card-deviceitem'
                border={"light"}
            >
                <Image
                    width={150}
                    height={150}
                    className='img-deviceitem'
                    src={process.env.REACT_APP_API_URL + device.img}
                />
                <div className='name-deviceitem'
                    onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}
                    style={{ cursor: 'pointer' }}
                
                >
                    {device.name} 
                </div>
                <div className='d-flex justify-content-between align-items-center bigdiv_rating-deviceitem'>
                    <div className='d-flex align-items-center div_rating-deviceitem'>
                        <div className='rating-deviceitem'>
                            {device.price.toLocaleString('ru-RU')} ₽
                        </div>
                    </div>
                </div>
                <div className='div_btn-deviceitem'>
                    <Button className='btn-deviceitem' onClick={handleAddToBasket}>В корзину</Button>
                </div>
            </Card>
        </Col>
        
    );
};

export default DeviceItem;