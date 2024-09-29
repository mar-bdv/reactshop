import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";

const BrandBar = observer(() => {
    const {device} = useContext(Context)

    return (
        <>
            <h1 className='heading-brandbar'>Бренды</h1>
            <hr className='filters-hr'/>

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
    );
});

export default BrandBar;