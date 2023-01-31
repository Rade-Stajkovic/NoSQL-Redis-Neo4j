import React from "react";
import Narudzbina from "../Narudzbina/Narudzbina";
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
  const [order, setOrder] = useState("");

  let { IdProduct } = useParams();
  let { IDUser } = useParams();
  const [loading, setLoading] = useState(true);

  const [following, setFollowing] = useState(false);
  
  

  function ordershow() {
    setOrder(true);
  }
  function orderhide() {
    setOrder(false);
  }

  // if(localStorage.getItem('user-info'))
  // {
  //   test =JSON.parse(localStorage.getItem('user-info'));
  //   bearer = 'Bearer ' + test.token;
  //   console.log(bearer);
  // }

  useEffect(() => {
    const followOrUnfollow = following ? Unfollow : Follow;
  
    axios.put(`https://localhost:44332/User/{followOrUnfollow}Product/${IDUser}/${IdProduct}`)
      .then(res => {
        setFollowing(!following);
      })
      .catch(err => {
        console.log(err);
      });
  }, [following, IDUser, IdProduct]);
  
  function Follow () {
    console.log("Following product");
  };
  
  function Unfollow() {
    console.log("Unfollowing product");
  };



  useEffect(() => {
    axios.get(`https://localhost:44332/Product/GetMoreDetails/${IdProduct}`)
      .then(res => {
        console.log(res.data);
        setProduct(res.data);
        setLoading(false)
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
                  <h5>{product.nameProduct}</h5>
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
                    {product.stored.map(market => (
                      <div key={market.id} className="d-flex flex-column align-items-start mb-1">
                        <div className="d-flex flex-row align-items-center">
                          <h4 className="mb-1 me-1">{market.market}-</h4>
                          <h4 className="mb-1 me-1 ml-auto">{market.price} din</h4>
                          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <MDBBtn color="primary" size="sm" onClick={ordershow}> NARUCI</MDBBtn></div>
                            <Narudzbina show={order} onHide={orderhide}  nameProduct={product.nameProduct} price={market.price} market={market.market}></Narudzbina>
                        </div>

                      </div>
                    ))}
                  </div>
                  <div className="d-flex flex-column mt-4">
                    {following ? (
                      <MDBBtn color="danger" size="sm" onClick={ Unfollow()}>
                        Prestani da pratiš
                      </MDBBtn>
                    ) : (
                      <MDBBtn color="primary" size="sm" onClick={Follow()}>
                        Zaprati Proizvod
                      </MDBBtn>
                    )}
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
