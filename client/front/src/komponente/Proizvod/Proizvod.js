import React from "react";
import Axios from "axios";
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
import { useEffect, useState } from "react";
//import "./ecommerce-category-product.css";
function Proizvod(props) {
  const [name, setName] = useState("");
  const rating = props.rating;

  let stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<MDBIcon fas icon="star" key={i} />);
  }

  useEffect(() => {
    Axios.get('https://localhost:5001/Product/GetAllProducts')
      .then((res) => {setName(res.data.name)})
      
  }, []);
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
                  <h5>{name}</h5>
                  <div className="d-flex flex-row">
                    <div className="text-danger mb-1 me-2">{stars}</div>
                    <span>{rating}</span>
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
                  className="border-sm-start-none border-start">
                <div className="d-flex flex-row align-items-center mb-1">
                    <h4 className="mb-1 me-1">IDEA</h4>
                     <h4 className="mb-1 me-1">139.9 din</h4>
                     <span className="text-danger">                       <s>200.99</s>
                     </span>
                  </div>
                   {/* <h6 className="text-success">Free shipping</h6> */}
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

  
   );
 }
 export default Proizvod;
