using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Neo4jClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NBP_backend.Models;

namespace NBP_backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IGraphClient _client;

      

        private readonly ILogger<UserController> _logger;

        public UserController(IGraphClient client)
        {
            _client = client;
        }

        [HttpGet]

        public async Task<IActionResult> Get()
        {
            var rng = await _client.Cypher.Match("(n:WeatherForecast)")
                                          .Return(n => n.As<User>()).ResultsAsync;
            return Ok(rng);
        }

        [HttpPost]

        public async Task<IActionResult> Create([FromBody] User wf)
        {
            await _client.Cypher.Create("(n:WeatherForecast $dept)")
                                .WithParam("dept", wf)
                                .ExecuteWithoutResultsAsync();
            return Ok();
        }
    }
}
