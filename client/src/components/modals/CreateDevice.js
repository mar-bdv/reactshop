import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, Form, Dropdown, Row, Col } from "react-bootstrap";
import { Context } from "../..";
import { createDevice, fetchBrands, fetchTypes } from "../../http/deviceAPI";
import { observer } from "mobx-react-lite";


const CreateDevice = observer(({ show, onHide }) => {
    const {device} = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])
    
    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
    }, [device])

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number)) 
    }


    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const selectFile = (e) => {
        setFile(e.target.files[0])
    }

    const addDevice = () => {
        const formData = new FormData();
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', device.selectedBrand.id)
        formData.append('typeId', device.selectedType.id)
        formData.append('info', JSON.stringify(info))
        createDevice(formData).then(data => onHide())
    }

    return (
            <Modal show={show} onHide={onHide} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Добавить устройство
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Dropdown className="mt-2 mb-2">
                            <Dropdown.Toggle className="dropdown-device">
                                {device.selectedType.name || "Выберите тип"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdownMenu-device">
                                {device.types.map(type => 
                                    <Dropdown.Item 
                                        onClick={() => device.setSelectedType(type)}
                                        className="dropdownItem-device"
                                        key={type.id}
                                    >
                                        {type.name}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown className="mt-2 mb-2">
                            <Dropdown.Toggle className="dropdown-device">
                                {device.selectedBrand.name || "Выберите бренд"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdownMenu-device">
                                {device.brands.map(brand => 
                                    <Dropdown.Item 
                                        onClick={() => device.setSelectedBrand(brand)}
                                        key={brand.id}
                                    >
                                        {brand.name}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>

                        <Form.Control
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="mt-3"
                            placeholder="Введите название устройства"
                        />
                        <Form.Control
                            value={price}
                            onChange={e => setPrice(Number(e.target.value))}
                            className="mt-3"
                            placeholder="Введите стоимость устройства"
                            type="number"
                        />
                        <Form.Control
                            className="mt-3"
                            type="file"
                            onChange={selectFile}
                        />

                        <hr />

                        <Button
                            className="property-device"
                            onClick={addInfo}
                        >
                            Добавить новое свойство
                        </Button>

                        {info.map(i => 
                            <Row className="mt-4" key={i.number}>
                                <Col md={4}>
                                    <Form.Control
                                        value={i.title}
                                        onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                        placeholder="Введите название свойства"
                                    />
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        value={i.description}
                                        onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                        placeholder="Введите описание свойства"

                                    />
                                </Col>
                                <Col md={4}>
                                    <Button 
                                        onClick={() => removeInfo(i.number)}
                                        className="delete-property"
                                    >
                                        Удалить
                                    </Button>
                                </Col>
                            </Row>
                        )}

                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button className="hide-modal" onClick={onHide}>
                        Закрыть
                    </Button>
                    <Button className="adding-modal" onClick={addDevice}>
                        Добавить
                    </Button>
                </Modal.Footer>

            </Modal>
        );
});

export default CreateDevice;

