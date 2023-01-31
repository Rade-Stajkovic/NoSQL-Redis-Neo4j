// import React, { useState } from 'react';
// import { Modal, Form, FormControl, Button, InputGroup, DropdownButton, Dropdown } from 'react-bootstrap';

// const Narudzbina = (props) => {
//     const { show, onHide } = props;

//     const [kolicina, setKolicina] = useState('');
//     const [dostavljac, setDostavljac] = useState('');
//     const [market, setMarket] = useState('');
//     const [cena, setCena] = useState('');
//     const [lokacija, setLokacija] = useState('');
//     const [brtel, setBrTel] = useState('');

//     async function order() {
//         console.log(kolicina, dostavljac, market, cena, lokacija, brtel);
//     }

//     return (
//         <Modal {...props} size="lg" centered>
//             <Modal.Header closeButton>
//                 <Modal.Title>{props.productName}</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Form>
//                     <Form.Group>
//                         <Form.Label>Market</Form.Label>
//                         <Form.Control value={market} onChange={e => setMarket(e.target.value)} type="text" placeholder="Ime marketa" />
//                     </Form.Group>
//                     <Form.Group>
//                         <Form.Label>Broj telefona</Form.Label>
//                         <Form.Control value={brtel} onChange={e => setBrTel(e.target.value)} type="text" placeholder="Broj telefona" />
//                     </Form.Group>
//                     <Form.Group>
//                         <Form.Label>Lokacija</Form.Label>
//                         <Form.Control value={lokacija} onChange={e => setLokacija(e.target.value)} type="text" placeholder="Lokacija" />
//                     </Form.Group>
//                     <Form.Group>
//                         <Form.Label>Dostavljač</Form.Label>
//                         <Form.Control as="select" value={dostavljac} onChange={e => setDostavljac(e.target.value)}>
//                             <option value="">Izaberite dostavljača</option>
//                             <option value="Dostavljač 1">Dostavljač 1</option>
//                             <option value="Dostavljač 2">Dostavljač 2</option>
//                             <option value="Dostavljač 3">Dostavljač 3</option>
//                         </Form.Control>
//                     </Form.Group>
               