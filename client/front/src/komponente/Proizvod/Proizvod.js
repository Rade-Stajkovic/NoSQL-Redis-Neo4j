import React from "react";

import { useState } from "react";

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
import { Link } from "react-router-dom";




import { useState,useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

function Proizvod() {
  const { IDCat } = useParams();
  const [products, setProducts] = useState([]);
 

  useEffect(() => {
    axios.put(`https://localhost:44332/GetAllProducts/${IDCat}`)
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [IDCat]);

  console.log(products)
  return (
    <div>
      {products.length === 0 ? (
        <div>No products found.</div>
      ) : (
        <MDBRow>
          {products.map((e, index) => {
            return (
              <MDBCol md="4" key={index}>
                <MDBCard  className="position-relative" >
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
                    <MDBBtn outline color="primary" size="sm" className="mt-2">
                        OPSIRNIJE
                    </MDBBtn>
                    </a>
                </div>
            </MDBCol>
        </MDBRow>
    </MDBCardBody>
                </MDBCard>
              </MDBCol>
            );
          })}
        </MDBRow>
      )}
   

    </div>
  );
}


export default Proizvod;
