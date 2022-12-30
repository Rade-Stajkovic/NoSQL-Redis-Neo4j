﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Neo4jClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NBP_backend.Models;
using NBP_backend.Services;
namespace NBP_backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController:ControllerBase
    {
        private readonly ProductServices _productServices;

        public ProductController(ProductServices productServices)
        {
            _productServices = productServices;
        }

        [HttpGet]
        [Route("GetAllProducts")]

        public async Task<IActionResult> GetAll()
        {
            return Ok(_productServices.GetAll());
        }


        [HttpPost]
        [Route("CreateProduct/{name}")]
        public async Task<IActionResult> Create(String name)
        {
            _productServices.CreateProduct(name);
            return Ok("Uspelo");
        }

        [HttpDelete]
        [Route("DeleteProduct/{id}")]

        public async Task<IActionResult> Delete(String id)
        {
           _productServices.DeleteProduct(id);
            return Ok("Uspesno obrisan");
        }
    }
}
