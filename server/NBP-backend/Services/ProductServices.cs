using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Neo4jClient;
using NBP_backend.Models;
using System.Collections;
namespace NBP_backend.Services
{
    public class ProductServices
    {
        private readonly IGraphClient _client;


        public ProductServices(IGraphClient client)
        {
            _client = client;
        }
    }
}
