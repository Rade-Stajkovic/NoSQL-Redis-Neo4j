import React from "react";
import { useEffect, useState } from "react";
//import Carousel from "react-elastic-carousel";
import { Col,  Card } from "react-bootstrap";
import { Carousel } from 'react-responsive-carousel';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBIcon,
  MDBRipple,
  MDBBtn,
} from "mdb-react-ui-kit";
import axios from "axios";





const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

function SliderP ()  {
const [products, setProducts] = useState();

useEffect(() => {
  axios.get("https://localhost:44332/Product/GetAllProducts")
    .then(res => {
      setProducts(res.data);
    })
    .catch(err => {
      console.log(err);
    });
}, []);

console.log(products)

if(products) {
  return (
    <>
      <MDBRow>
        {products.map((e, index) => (
          <MDBCol md="3" key={index}>
            <MDBCard className="position-relative">
              <MDBCardImage
                src="https://cegermarket.rs/wp-content/uploads/2020/06/ceger-market-banane.jpg"
                fluid
                className="w-100"
                alt={e.name}
              />
              <MDBCardBody>
                <MDBRow className="d-flex justify-content-center align-items-center">
                  <MDBCol>
                    <MDBCardTitle className="text-center">{e.name}</MDBCardTitle>
                    <div className="text-center">
                      <a href={`/proizvod/${e.id}`}>
                        <MDBBtn
                          outline
                          color="primary"
                          size="sm"
                          className="mt-2"
                        >
                          OPSIRNIJE
                        </MDBBtn>
                      </a>
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </>
  );
} else {
  return <div></div>;
}
} 
export default SliderP;

