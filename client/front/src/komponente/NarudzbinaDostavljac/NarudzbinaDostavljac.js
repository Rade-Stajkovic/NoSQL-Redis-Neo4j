import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBCardFooter,
  MDBBtn,
  MDBCol,
  MDBRow,
  MDBContainer
} from 'mdb-react-ui-kit';



function NarudzbinaDostavljac()
{

    const data = [
        {
          Market: "Cutura",
          Proizvod: "Banane",
          Kolicina: "3kg",
          Cena: "600din",
          Adresa: "Cara Lazara",
          BrojTelefona: "0611174598",
          ImeMusterije: "Marko"
        },
        {
          Market: "Lidl",
          Proizvod: "Jabuke",
          Kolicina: "2kg",
          Cena: "450din",
          Adresa: "Bulevar kralja Aleksandra",
          BrojTelefona: "0622334455",
          ImeMusterije: "Petar"
        }
      ];


      return (


        <MDBRow>
  {data.map(nar => (
    <MDBCol md='4'>
      <MDBCard className='text-center mb-3'>
           <MDBCardHeader><MDBCardTitle style={{ fontSize: '25px' }}>Market {nar.Market}</MDBCardTitle></MDBCardHeader>
           <MDBCardBody>
             {/* <MDBCardTitle>Proizvod: {nar.Proizvod}</MDBCardTitle>
             <MDBCardTitle>Količina: {nar.Kolicina}</MDBCardTitle>
             <MDBCardTitle>Cena: {nar.Cena}</MDBCardTitle>
            <MDBCardTitle>Adresa: {nar.Adresa}</MDBCardTitle>
             <MDBCardTitle>Ime: {nar.ImeMusterije}</MDBCardTitle>
             <MDBCardTitle>BrojTelefona: {nar.BrojTelefona}</MDBCardTitle> */}

             <p style={{ margin: 0 }}><b>Proizvod:</b> {nar.Proizvod}</p>
             <p style={{ margin: 0 }}><b> Količina:</b> {nar.Kolicina}</p>
             <p style={{ margin: 0 }}><b> Cena:</b> {nar.Cena}</p>
             <p style={{ margin: 0 }}><b>Adresa:</b> {nar.Adresa}</p>
             <p style={{ margin: 0 }}><b>Ime: </b>{nar.ImeMusterije}</p>
             <p style={{ margin: 0 }}><b>Broj:</b> {nar.BrojTelefona}</p>
            
             <MDBBtn href='#' className='m-3'>DOSTAVLJENO</MDBBtn>
           <MDBCardText className='text-muted'>Kliknite ukoliko ste izvršili dostavu.</MDBCardText>
           </MDBCardBody>
           <MDBCardFooter className='text-muted'></MDBCardFooter>
         </MDBCard>
    </MDBCol>
  ))}
</MDBRow>

          
           );
     
           
     
     }
     export default NarudzbinaDostavljac;

