import React, {useState} from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBCheckbox,
  MDBValidation,
  MDBValidationItem,
 
}
from 'mdb-react-ui-kit';

function Registracija() {
  const [formValue, setFormValue] = useState({
    fname: '',
    lname: '',
    username: '',
    password: '',
    
  });

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
    
    
  };

  

  const handleSubmit = (e) => {
    if (formValue.fname && formValue.lname && formValue.username && formValue.password) {
      
      const checkbox = document.getElementById('invalidCheck');
      if (checkbox.checked) {
        console.log(formValue); 
      } else {
        const checkboxValidationItem = document.getElementById('invalidCheck');
        checkboxValidationItem.setAttribute('valid', true);
      }
    } else {
      const fnameValidationItem = document.getElementById('validationCustom01');
      const lnameValidationItem = document.getElementById('validationCustom02');
      const usernameValidationItem = document.getElementById('validationCustom03');
      const passwordValidationItem = document.getElementById('validationCustom04');
  
      if (!formValue.fname) {
        fnameValidationItem.setAttribute('invalid', true);
      }
      if (!formValue.lname) {
        lnameValidationItem.setAttribute('invalid', true);   
      }
      if (!formValue.usernameValidationItem) {
        usernameValidationItem.setAttribute('invalid', true);   
    }
    if (!formValue.passwordValidationItem) {
      passwordValidationItem.setAttribute('invalid', true);   
}


}};
  return (
    <MDBContainer fluid className='bg-secondary p-2 text-dark bg-opacity-10 d-flex justify-content-center' >

      <MDBCard className='text-black m-5 align-items-center  '  style={{borderRadius: '12px', maxWidth: '900px' }}>
        <MDBCardBody size='lg' >
          <MDBRow>
          <MDBValidation className='row g-3'>
            <MDBCol  className='order-2 order-lg-1 d-flex flex-column align-items-center'>

            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-2">Registruj se</p>


          
              <div className="d-flex flex-row align-items-center mb-4 ">

              <MDBValidationItem feedback='Unesite ime' invalid>
              <MDBInput
                value={formValue.fname}
                name='fname'
                onChange={onChange}
                id='validationCustom01'
                required
                label='Ime'
              />
              </MDBValidationItem>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
              <MDBValidationItem feedback='Unesite prezime' invalid>
              <MDBInput
                value={formValue.lname}
                name='lname'
                onChange={onChange}
                id='validationCustom02'
                required
                label='Prezime'
                
              />
              </MDBValidationItem>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
              <MDBValidationItem feedback="Unesite korisničko ime" invalid >
              <MDBInput
                  value={formValue.username}
                  name='username'
                  onChange={onChange}
                  className='form-control'
                  id='validationCustom03'
                  label='Korisničko ime'
                  required
                  
                />
              
              </MDBValidationItem>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
              <MDBValidationItem feedback='Unesite lozinku' invalid>
              <MDBInput
                value={formValue.password}
                type='password'
                onChange={onChange}
                id='validationCustom04'
                required
                label='Lozinka'
                name='password'
              />
            </MDBValidationItem>
              </div>

              <div className='mb-4'>
              <MDBValidationItem className='col-12' feedback='Morate da prihvatite pre registracije.' invalid>
        <MDBCheckbox label='Slažem se sa uslovima korišćenja'   id='invalidCheck' required />
      </MDBValidationItem>
              </div>

              <MDBBtn type='submit' size='lg'  className='mb-4' onClick={handleSubmit} >REGISTRACIJA</MDBBtn>
            
              
            </MDBCol>
            
            <MDBCol  className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://img.freepik.com/free-vector/seasonal-sale-discounts-presents-purchase-visiting-boutiques-luxury-shopping-price-reduction-promotional-coupons-special-holiday-offers-vector-isolated-concept-metaphor-illustration_335657-2766.jpg' fluid/>
            


              
            </MDBCol>

</MDBValidation>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>

    </MDBContainer>
  );
}

export default Registracija;