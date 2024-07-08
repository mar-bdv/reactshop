import React, { useContext, useEffect } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import TypeBar from '../components/TypeBar';
import BrandBar from '../components/BrandBar';
import DeviceList from '../components/DeviceList';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceAPI';
import Pages from '../components/Pages';

const Shop = observer(() => { 
    const {device} = useContext(Context)
    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data));
        fetchBrands().then(data => device.setBrands(data));
        fetchDevices(null, null, 1, 2).then(data => {
            device.setDevices(data.rows);
            device.setTotalCount(data.count);
        });
    }, [device]); 

    useEffect(() => {
        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 2).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device.page, device.selectedType, device.selectedBrand, device]);
    
    return (
        <Container>
            <Row>
                <Col>
                    <TypeBar/>
                </Col>
                <Col>
                    <BrandBar/>
                    <DeviceList/>
                    <Pages/>
                </Col>
                <Col>
                    
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;