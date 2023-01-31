// import React from "react";
// import { useEffect, useState } from "react";
// import Carousel from "react-elastic-carousel";
// import { Col, Row, Card } from "react-bootstrap";
// import Proizvod from '../Proizvod/Proizvod';



// const breakPoints = [
//     { width: 1, itemsToShow: 1 },
//     { width: 550, itemsToShow: 2 },
//     { width: 768, itemsToShow: 3 },
//     { width: 1200, itemsToShow: 4 },
//   ];

//  const Slider = () => {
//     const [products, setProducts] = useState();
//     //const [ idProd, setIdProd] = useState();


//     useEffect(() => {
//         fetch("https://localhost:5001//Product/GetAllProducts")
//         .then((response) =>{
//             return response.json();
//           })
//           .then((data) => {
//             const products = [];
//             console.log(data);
//             for(const key in data) {
//               const p = {
//                 id: key,
//                 ...data[key]
//               }
//               console.log(p);
//               products.push(p);
//             }
        
//             setProducts(products);
//           })
     

//     },[])




//     const niz = [1,2,3,4,5,1,];
//   if(products)
//   {
//     return (
//         <>
//          <Carousel breakPoints={breakPoints} >
//          {products.map((e) => {
//           return <Col className="p-1"><Card ><Proizvod ></Proizvod></Card></Col>})}
//          </Carousel>
//         </>
//     )
//     }
//     else return <div></div>

// } z
// export default Slider;