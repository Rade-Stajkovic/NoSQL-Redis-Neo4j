using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NBP_backend.Models;
using NBP_backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
namespace NBP_backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController
    {
        private readonly ProductServices _productServices;

        public ProductController(ProductServices productServices)
        {
            _productServices = productServices;
        }


    }
}
