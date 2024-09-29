import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '..';
import { Row } from 'react-bootstrap';
import DeviceItem from './DeviceItem';

// отображение товаров на странице, можно через css настроить красоту

const DeviceList = observer(() => { 
    const { device } = useContext(Context)
    return (
        <>
            {device.devices.length === 0 ? (
                <div className="no-products-message">Не найдено товаров.</div>
            ) : (
                <Row>
                    {device.devices.map(deviceItem => (
                        <DeviceItem key={deviceItem.id} device={deviceItem} />
                    ))}
                </Row>
            )}
        </>
    );
});

export default DeviceList;