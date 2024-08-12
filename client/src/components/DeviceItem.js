import React from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import star from '../assets/star.png'
import { useNavigate } from "react-router-dom"
import { DEVICE_ROUTE } from '../utils/consts';

const DeviceItem = ({device}) => { 
    const navigate = useNavigate()
    return (
        <Col
        onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}
        className='col-deviceitem'>
            
            <Card style={{cursor: "pointer", }} 
            className='card-deviceitem'
            border={"light"}>
                <Image 
                width={150} height={150} 
                className='img-deviceitem'
                src={process.env.REACT_APP_API_URL + device.img}/>
                
                <div
                className='name-deviceitem'
                >
                    {device.name}
                </div>

                <div
                className='d-flex 
                justify-content-between align-items-center
                bigdiv_rating-deviceitem'>
                
                    <div className='d-flex align-items-center
                    div_rating-deviceitem'>
                        <div className='rating-deviceitem'>
                            {device.rating}
                        </div>
                        <Image className='star-deviceitem'
                        width={15} height={15} src={star}/>
                    </div>


                </div>
                
                <div className='div_btn-deviceitem'>
                    <button className='btn-deviceitem'>
                        В корзину
                    </button>
                </div>
            
            </Card>


            
        </Col>
    );
};

export default DeviceItem;