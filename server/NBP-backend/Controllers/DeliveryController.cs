using Microsoft.AspNetCore.Mvc;
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
    public class DeliveryController: ControllerBase
    {

        private readonly DeliveryServices _deliveryServices;

        public DeliveryController(DeliveryServices deliveryServices)
        {
            _deliveryServices = deliveryServices;
        }

        [HttpPost]
        [Route("CreateDelivery/{name}/{password}/{deliveryCost}")]
        public async Task<IActionResult> Create(String name, String password, int deliveryCost)
        {
            _deliveryServices.CreateDelivery(name, password, deliveryCost);
            return Ok("Uspelo");
        }



        [HttpGet]
        [Route("LogIn/{name}/{password}")]
        public IActionResult LogIn(String name, String password)
        {
            try
            {
                Task<int> res = _deliveryServices.LogInDelivery(name, password);
                int res1 = res.Result;
                if (res1 == -1)
                {
                    return BadRequest("Pogresna sifra");
                }
                else if (res1 == -2) return BadRequest("Korisnik ne postoji");
                return Ok(res1);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}
