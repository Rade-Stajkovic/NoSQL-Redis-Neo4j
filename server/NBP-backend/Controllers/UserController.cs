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
    public class UserController : ControllerBase
    {
        private readonly UserServices _userServices;

      

        private readonly ILogger<UserController> _logger;

        public UserController(UserServices userServices)
        {
            _userServices = userServices;
        }

        [HttpGet]
        [Route("GetAll")]
        public async Task<IActionResult> Get()
        {
            //var rng = await _client.Cypher.Match("(n:WeatherForecast)")
            //                              .Return(n => n.As<User>()).ResultsAsync;
            
            return Ok(_userServices.GetAll());
        }

    
        [HttpPost]
        [Route("CreateUser/{username}/{password}")]
        public async Task<IActionResult> Create(String username, String password)
        {
            _userServices.CreateUser(username, password);
            return Ok("Uspelo");
        }
    }
}
