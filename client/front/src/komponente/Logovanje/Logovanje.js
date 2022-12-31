import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';

function Logovanje() {
  return (
    <MDBContainer className="my-5">

      <MDBCard>
        <MDBRow className='g-0' center>

          <MDBCol md='4' center >
            <MDBCardImage src='https://as2.ftcdn.net/v2/jpg/05/28/55/97/1000_F_528559716_az7F03Lp6XZvtkADvj6goWONc45Xgf0z.jpg' alt="login form" className='rounded-start w-100'/>
          </MDBCol>

          <MDBCol md='3'>
            <MDBCardBody className='d-flex flex-column'>

              <div className='d-flex flex-row mt-2'>
                
                <span className="h1 fw-bold mb-0">Uloguj se!</span>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Prijavi se na svoj profil</h5>

                <MDBInput wrapperClass='mb-4' label='Email adresa' id='formControlLg' type='email' size="lg"/>
                <MDBInput wrapperClass='mb-4' label='Lozinka' id='formControlLg' type='password' size="lg"/>

              <MDBBtn className="mb-4 px-5" color='dark' size='lg'>Prijavi se</MDBBtn>
              
              <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Nemas nalog? <a href="/registracija" style={{color: '#393f81'}}>Registruj se ovde.</a></p>

              <div className='d-flex flex-row justify-content-start'>
                <a href="#!" className="small text-muted me-1">Terms of use.</a>
                <a href="#!" className="small text-muted">Privacy policy</a>
              </div>

            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer>
  );
}

export default Logovanje;