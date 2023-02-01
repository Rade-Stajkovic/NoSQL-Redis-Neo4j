import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Logovanje from '../Logovanje/Logovanje';

import { useState, useEffect } from "react";
import axios from "axios";
import Notifikacije from '../Notifikacije/Notifikacije';
import './Navigacija.css'


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
  MDBBadge,
  MDBPopover,
  MDBPopoverBody,
  MDBPopoverHeader,
 
} from 'mdb-react-ui-kit';

const Navigacija = (props) =>
{
  const [popoverOpen, setPopoverOpen] = useState(false);
  const[login, setlogin]= useState("");
  const[notifications, setNotifications]= useState(false);
  const [categories, setCategories] = useState();
  const test = JSON.parse(localStorage.getItem('user-info'))
  useEffect(()=>{

    axios.get("https://localhost:44332/GetAllCategories")
    .then(res => {
      console.log(res)
      setCategories(res.data)
    })
    
    .catch(err => {
      console.log(err)
    })
  },[])
  
  console.log(categories)
  function notificationsShow()
  {
    setNotifications(true);
  }
  function notificationsHide()
  {
    setNotifications(false);
  }



  function loginshow() {
    setlogin(true);
  }
  function loginhide() {
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
              <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                  Kategorije
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  {categories ? categories.map(category => (
                    <MDBDropdownItem key={category.tempID} >  <a href={`/kategorija/${category.name}/${category.tempID}`} style={{ color: '#393f81' }}>
                      {category.name}
                    </a></MDBDropdownItem>
                  )) : <p>Loading...</p>}
                </MDBDropdownMenu>
              </MDBDropdown>
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

          
          
          

          <form className='d-flex input-group w-auto'>
            <input type='search' className='form-control' placeholder='Pretraži' aria-label='Search' />
            <MDBBtn color='primary'><MDBIcon fas icon="search" /></MDBBtn>
          </form>

          <div>   
      {setNotifications && <Notifikacije onClose={() => setNotifications(false)}  />}
    </div>

          <MDBNavbarItem>
            <MDBNavbarLink onClick={loginshow} eventkey={2} style={{ whiteSpace: 'nowrap' }}>Prijavi se</MDBNavbarLink>
          </MDBNavbarItem>


          <Logovanje show={login} onHide={loginhide}></Logovanje>
          
          {/* <MDBNavbarItem> <MDBNavbarLink onClick={notificationsShow} eventkey={2}>Notifikacije </MDBNavbarLink></MDBNavbarItem>
          <Notifikacije show={notifications} onHide={notificationsHide}></Notifikacije> */}
          

          {/* <MDBPopover color='secondary' btnChildren='Popover on bottom' placement='bottom' onClick={notificationsShow}></MDBPopover>
          <Notifikacije show={notifications} onHide={notificationsHide}></Notifikacije> */}









         

        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
export default Navigacija;