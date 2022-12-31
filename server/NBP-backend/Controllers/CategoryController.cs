﻿using Microsoft.AspNetCore.Mvc;
using NBP_backend.Services;
using System.Threading.Tasks;
using System;
using NBP_backend.Models;

namespace NBP_backend.Controllers
{
    public class CategoryController :ControllerBase
    {
        private readonly CategoryServices _categoryServices;

        public CategoryController(CategoryServices CategoryServices)
        {
            _categoryServices = CategoryServices;
        }

        [HttpPost]
        [Route("CreateCategory/{name}")]
        public IActionResult Create(String name)
        {
            _categoryServices.CreateCategory(name);
            return Ok("Uspelo");
        }

        [HttpPut]
        [Route("AddProduct/{IDCategory}/{IDProduct}")]
        public IActionResult AddProduct(int IDCategory, int IDProduct)
        {
            try
            {
                Task<bool> res = _categoryServices.AddProduct(IDCategory, IDProduct);
                bool res1 = res.Result;
                if (res1)
                {
                    return Ok("Uspesno ste dodali kategoriju proizvodu");
                }
                return BadRequest("Nista");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete]
        [Route("RemoveProduct/{IDCategory}/{IDProduct}")]
        public IActionResult RemoveProduct(int IDCategory, int IDProduct)
        {
            try
            {
                Task<bool> res = _categoryServices.RemoveProduct(IDCategory, IDProduct);
                bool res1 = res.Result;
                if (res1)
                {
                    return Ok("Uspesno ste otpratili proizvod");
                }
                return BadRequest("Nista");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
