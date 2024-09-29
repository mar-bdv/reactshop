import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import CreateBrand from '../components/modals/CreateBrand';
import CreateDevice from '../components/modals/CreateDevice';
import CreateType from '../components/modals/CreateType';

const Admin = () => { 
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)

    return (
        <Container className='d-flex flex-column'>
            <Button  
                className='mt-2 admin-btns'
                onClick={() => setTypeVisible(true)}
            >
                    Добавить тип
            </Button>

            <Button 
                className='mt-2 admin-btns'
                onClick={() => setBrandVisible(true)}
            >
                    Добавить бренд
            </Button>
            
            <Button  
                className='mt-2 admin-btns'
                onClick={() => setDeviceVisible(true)}
            >
                    Добавить устройство
            </Button>

            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            
        </Container>
    );
};

export default Admin;