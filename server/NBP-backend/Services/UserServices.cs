using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Neo4jClient;
using NBP_backend.Models;
using System.Collections;
using Neo4jClient.Cypher;
namespace NBP_backend.Services

{
    public class UserServices
    {
        private readonly IGraphClient _client;
      

        public UserServices(IGraphClient client)
        {
            _client = client;
        }

        public  List<User> GetAll()
        {
            List<User> users = new List<User>();
            //var users2 = _client.Cypher.Match("(n:WeatherForecast)")
            //                         .Return(n => n.As<User>()).ResultsAsync;
            var res = _client.Cypher.Match("(n:User)")
                                     .Return(n => n.As<User>()).ResultsAsync.Result;
            var us = res.ToList();
            foreach (var x in res)
            {
                users.Add(x);
            }
            return users;
        }

        public async void CreateUser(User user)
        {
             await _client.Cypher
                      .Create("(n:User $dept)")
                      .WithParam("dept", user)
                      .ExecuteWithoutResultsAsync();
        }

        public async void CreateUser(String username, String password)
        {
            User user = new User();
            user.UserName = username;
            user.Password = password;
            await _client.Cypher
                      .Create("(n:User $dept)")
                      .WithParam("dept", user)
                      .ExecuteWithoutResultsAsync();
        }
    }
}
