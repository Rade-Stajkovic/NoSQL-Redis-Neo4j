import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Logovanje from './komponente/Logovanje/Logovanje';
import Navigacija from './komponente/Navigacija/Navigacija';
import React, { useEffect, useState } from 'react';
import Registracija from './komponente/Registracija/Registracija';
import Kategorija from './komponente/Kategorija/Kategorija';
import Pocetna from './Pocetna'
import SamoProizvod from './komponente/SamoProizvod/SamoProizod';
import Pretraga from './komponente/Pretraga';

function Rute ()
{
    

    return (<div style={{ width:'100%', height:'100vh' }}> 
       
        <Navigacija />
    
        <div >
        <BrowserRouter>
        <Routes>  
            <Route path='/logovanje' element={<Logovanje />} />
            <Route path='/registracija' element={<Registracija/>} />
            <Route path='/kategorija/:name/:IDCat' element={<Kategorija/>} />
            <Route path='/' element={<Pocetna/>} />
            <Route path='/proizvod/:IdProduct' element={< SamoProizvod />} />
            <Route path='/pretraga' element = {<Pretraga/>} />
        </Routes>
        </BrowserRouter>
        </div>

        </div>
           );
}
export default Rute;