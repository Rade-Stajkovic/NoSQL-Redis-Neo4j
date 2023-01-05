import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Logovanje from '../Logovanje/Logovanje';
import Proizvod from '../Proizvod/Proizvod';


import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
  MDBBadge
} from 'mdb-react-ui-kit';

const Navigacija = (props) =>
{
  const[login, setlogin]= useState("");

  function loginshow()
  {
    setlogin(true);
  }
  function loginhide()
  {
    setlogin(false);
  }
  return (
    
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='#'>Brand</MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          
          
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar >
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='#'>
                Početna
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='#'>Namirnice</MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBNavbarLink href='#'>Piće</MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBNavbarLink href='#'>Hemija</MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                  Akcije
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link>Mega Maxi</MDBDropdownItem>
                  <MDBDropdownItem link>Idea</MDBDropdownItem>
                  <MDBDropdownItem link>Metro</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>

            
          </MDBNavbarNav>

          
          <MDBNavbarItem >
            <MDBNavbarLink href='#'>
              <MDBIcon fas icon='shopping-cart' />
            </MDBNavbarLink>
          </MDBNavbarItem>
          

          <form className='d-flex input-group w-auto'>
            <input type='search' className='form-control' placeholder='Pretraži' aria-label='Search' />
            <MDBBtn color='primary'><MDBIcon fas icon="search" /></MDBBtn>
          </form>

          {/* <MDBNavbarItem >
          <MDBNavbarLink href="/logovanje" color='primary'>Prijava</MDBNavbarLink>
          </MDBNavbarItem> */}

          <MDBNavbarItem>
            <MDBNavbarLink onClick={loginshow} eventkey={2} >Prijavi se</MDBNavbarLink>
          </MDBNavbarItem>
          <MDBNavbarItem >
          <MDBNavbarLink href="/proizvod" color='primary'>Proizvodi</MDBNavbarLink>
          </MDBNavbarItem>
          

          <Logovanje show={login} onHide={loginhide}></Logovanje>
          

        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
export default Navigacija;