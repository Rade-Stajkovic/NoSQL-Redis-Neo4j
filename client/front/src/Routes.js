import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Logovanje from './komponente/Logovanje/Logovanje';
import Navigacija from './komponente/Navigacija/Navigacija';
import React, { useEffect, useState } from 'react';
import * as mdb from 'mdb-react-ui-kit';
import { Spinner, Container } from 'react-bootstrap';
import { Switch } from 'react-router-dom';
import Registracija from './komponente/Registracija/Registracija';
import Proizvod from './komponente/Proizvod/Proizvod';
import Pocetna from './Pocetna';


function Rute ()
{
    

    return (<div style={{ width:'100%', height:'100vh' }}> 
       
        <Navigacija />
    
        <div >
        <BrowserRouter>
        <Routes>  
            <Route path='/logovanje' element={<Logovanje />} />
            <Route path='/registracija' element={<Registracija/>} />
            <Route path='/proizvod' element={<Proizvod/>} />
            
            <Route path='/' element={<Pocetna/>} />
           
           
        </Routes>
        </BrowserRouter>
        </div>

        </div>
           );
}
export default Rute;