

import React from "react";
import { MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';
import {

  MDBPopover,
  MDBPopoverBody,
  MDBPopoverHeader
  
} from "mdb-react-ui-kit";

import './Notifikacije.css'

function Notifikacije(props){

    const { onClose } = props;
              
    return (
        
            <MDBPopover color='light' btnChildren={<><a  className=" mx-3">
            <i className="fas fa-envelope fa-2x"></i>
            
          </a> </>}> 
                    <MDBPopoverHeader color='light' >Notifikacije</MDBPopoverHeader>
                    <MDBPopoverBody color='secondary'>
                      <MDBListGroup>
                        <MDBListGroupItem noBorders color='light' className='px-3 mb-2 rounded-3'>Limun voda snizena</MDBListGroupItem>
                        <MDBListGroupItem noBorders color='light' className='px-3 mb-2 rounded-3'>Akcija akcija akcija</MDBListGroupItem>
                        <MDBListGroupItem noBorders color='light' className='px-3 mb-2 rounded-3'>Ne propustite ovaj lud i nezaboravan popust! AKCIJA AKCIJA AKCIJA</MDBListGroupItem>
                      </MDBListGroup>
                    </MDBPopoverBody>
                  </MDBPopover>

    );   
}
export default Notifikacije;
