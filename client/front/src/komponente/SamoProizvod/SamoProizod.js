import React from "react";

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
import { useState, useEffect } from "react";

import axios from "axios";
import { useParams } from 'react-router-dom';


function SamoProizvod() {
  const [product, setProduct] = useState();

  let { IdProduct } = useParams();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    axios.get(`https://localhost:44332/Product/GetMoreDetails/${IdProduct}`)
      .then(res => {
        if (res.data && res.data.length > 0) {
          setProduct(res.data);
          setLoading(false);
          console.log(res.data)
        }
        else {
          console.error("nema podataka za proizvod", IdProduct)
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [IdProduct]);

  console.log(product)
  if (loading) return <p>Loading...</p>;

  return (

    <MDBContainer fluid>
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
                    <span>{product.category}</span>
                    <span className="text-primary"> • </span>
                    <span>
                      povrce
                      <br />
                    </span>
                  </div>

                </MDBCol>


                <MDBCol md="6" lg="3" className="border-sm-start-none border-start">
                  <div>
                    {product.map(market => (
                      <div key={market.id} className="d-flex flex-column align-items-start mb-1">
                        <div className="d-flex flex-row align-items-center">
                          <h4 className="mb-1 me-1">{market.market}-</h4>
                          <h4 className="mb-1 me-1 ml-auto">{market.price} din</h4>
                          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <MDBBtn color="primary" size="sm" > NARUCI</MDBBtn></div>
                        </div>

                      </div>
                    ))}
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
