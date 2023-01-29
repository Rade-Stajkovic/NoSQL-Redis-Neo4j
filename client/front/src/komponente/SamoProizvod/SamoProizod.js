import React from "react";
import { BrowserRouter } from 'react-router-dom';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBRipple,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useState,useEffect } from "react";

import axios from "axios";
import { useParams } from 'react-router-dom';


function SamoProizvod() {
const [product, setProduct] = useState();
let { ID } = useParams();

useEffect(() => {
   axios.get(`https://localhost:4433/Product/GetProduct/${ID}`)
    .then(res => {
      setProduct(res.data);
    })
    .catch(err => {
      console.log(err);
    });
}, [ID]);

console.log(ID);
if (!product) {
  return <div>Loading...</div>
}

  return (
                <MDBContainer  fluid>
      <MDBRow className="justify-content-center mb-0">
        <MDBCol md="12" xl="10">
          <MDBCard className="shadow-0 border rounded-3 mt-5 mb-3">
            <MDBCardBody>
              <MDBRow>
                <MDBCol md="12" lg="3" className="mb-4 mb-lg-0">
                  <MDBRipple
                    rippleColor="light"
                    rippleTag="div"
                    className="bg-image rounded hover-zoom hover-overlay"
                  >
                    <MDBCardImage
                      src="https://cegermarket.rs/wp-content/uploads/2020/06/ceger-market-banane.jpg"
                      fluid
                      className="w-100"
                    />
                    <a href="#!">
                      <div
                        className="mask"
                        style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                      ></div>
                    </a>
                  </MDBRipple>
                </MDBCol>
                <MDBCol md="6">
                  <h5>{product.name}</h5>
                  <div className="d-flex flex-row">
                    <div className="text-danger mb-1 me-2">
                      <MDBIcon fas icon="star" />
                      <MDBIcon fas icon="star" />
                      <MDBIcon fas icon="star" />
                      <MDBIcon fas icon="star" />
                      <MDBIcon fas icon="star" />
                    </div>
                    <span>5</span>
                  </div>
                  <div className="mt-1 mb-0 text-muted small">
                    <span>Sifra Proizvoda</span>
                    <span className="text-primary"> • </span>
                    <span>481545555444</span>
                    <span className="text-primary">  </span>
             
                  </div>
                  <div className="mb-2 text-muted small">
                    <span>Kategorija</span>
                    <span className="text-primary"> • </span>
                    <span>voce</span>
                    <span className="text-primary"> • </span>
                    <span>
                      povrce
                      <br />
                    </span>
                  </div>
             
                </MDBCol>
                <MDBCol
                  md="6"
                  lg="3"
                  className="border-sm-start-none border-start"
                >
                  <div className="d-flex flex-row align-items-center mb-1">
                    <h4 className="mb-1 me-1">IDEA</h4>
                    <h4 className="mb-1 me-1">139.9 din</h4>
                    <span className="text-danger">
                      <s>200.99</s>
                    </span>
                  </div>
                
                  <div className="d-flex flex-column mt-4">
                    <MDBBtn color="primary" size="sm">
                      Zaprati
                    </MDBBtn>
                    <MDBBtn outline color="primary" size="sm" className="mt-2">
                      Dodaj u listu
                    </MDBBtn>
                
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      
  
    </MDBContainer>
 )
}



export default SamoProizvod;
