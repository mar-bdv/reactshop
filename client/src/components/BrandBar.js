import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, ListGroup, Row} from "react-bootstrap";

// Фильтрация по брендам

const BrandBar = observer(() => {
    const {device} = useContext(Context)

    return (
        // <Row className="d-flex brandbar">

        //     {device.brands.map(brand =>
        //         <Card
        //             style={{cursor:'pointer'}}
        //             key={brand.id}
        //             className="p-3 brandbar-item"
        //             onClick={() => device.setSelectedBrand(brand)}
        //             // border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
        //         >
        //             {brand.name}
        //         </Card>
        //     )}
        // </Row>
            <>
                <h1 className='heading-brandbar'>Бренды</h1>

                <ListGroup className='brandbar'>

                {device.brands.map(brand =>
                    <ListGroup.Item 
                        className='p-3 brandbar-item'
                        onClick={() => device.setSelectedBrand(brand)}
                        
                        key={brand.id}>
                            
                            {brand.name}
                    </ListGroup.Item>
                )}
                </ListGroup>
            </>

            // border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}

    
    );
});

export default BrandBar;