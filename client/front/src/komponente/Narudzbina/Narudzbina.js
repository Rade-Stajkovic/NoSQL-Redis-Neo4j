import React, { useState } from 'react';
import { Modal, Form, FormControl, Button, InputGroup, DropdownButton, Dropdown } from 'react-bootstrap';

const Narudzbina = (props) => {
    const { show, onHide ,} = props;

    const [kolicina, setKolicina] = useState(0);
    const [dostavljac, setDostavljac] = useState('');
    const [market, setMarket] = useState('');
    const [cena, setCena] = useState(0);
    const [lokacija, setLokacija] = useState('');
    const [brtel, setBrTel] = useState('');

    async function order() {
        console.log(kolicina, dostavljac, market, cena, lokacija, brtel);
    }

    const handlePriceCalculation = () => {
        return kolicina * props.price;
      }

    return (
        <Modal {...props} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>{props.nameProduct}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>{props.market}</Form.Label>
                       
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Unesite Vase informacije</Form.Label>
                       
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Broj telefona</Form.Label>
                        <Form.Control value={brtel} onChange={e => setBrTel(e.target.value)} type="text" placeholder="Broj telefona" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Lokacija</Form.Label>
                        <Form.Control value={lokacija} onChange={e => setLokacija(e.target.value)} type="text" placeholder="Lokacija" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Dostavljač</Form.Label>
                        <Form.Control as="select" value={dostavljac} onChange={e => setDostavljac(e.target.value)}>
                            <option value="">Izaberite dostavljača</option>
                            <option value="Dostavljač 1">Dostavljač 1</option>
                            <option value="Dostavljač 2">Dostavljač 2</option>
                            <option value="Dostavljač 3">Dostavljač 3</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Kolicina</Form.Label>
                        <Form.Control value={kolicina} onChange={e => setKolicina(e.target.value)} type="number" placeholder="Unesite kolicinu" />
                    </Form.Group>
                
                     <p>Ukupna cena: {handlePriceCalculation()}</p>
                    <Button onClick={order}>Narucite</Button>
                </Form>    
                    </Modal.Body>
                    </Modal>
    )}
    export default Narudzbina;