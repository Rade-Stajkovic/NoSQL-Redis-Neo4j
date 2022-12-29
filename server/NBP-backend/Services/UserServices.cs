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
    public class UserServices
    {
        private readonly IGraphClient _client;

        public UserServices(IGraphClient client)
        {
            _client = client;
        }

        public List<User> GetAll()
        {
            List<User> users = new List<User>();
            //var users2 = _client.Cypher.Match("(n:WeatherForecast)")
            //                         .Return(n => n.As<User>()).ResultsAsync;
            var res = _client.Cypher.Match("(n:WeatherForecast)")
                                     .Return(n => n.As<User>()).ToListAsync();
            var us = res.ToList();
            foreach (x in res)
            {

            }
            return users;
        }
    }
}
