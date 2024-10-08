import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '..';
import ListGroup from 'react-bootstrap/ListGroup';

const TypeBar = observer(() => { 
    const {device} = useContext(Context)
    return (
        <>
            <h2 className='heading-typebar'>Фильтры</h2>
            <hr className='filters-hr'/>

            <ListGroup className='typebar'>

                {device.types.map(type => 
                    <ListGroup.Item 
                        className='typebar-item'
                        active={type.id === device.selectedType.id}
                        onClick={() => device.setSelectedType(type)}
                        key={type.id}>
                            
                        {type.name}
                    </ListGroup.Item>
                )}
            </ListGroup>
        </>
    );
});

export default TypeBar;