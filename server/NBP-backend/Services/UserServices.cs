using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Neo4jClient;
using NBP_backend.Models;
using System.Collections;
using Neo4jClient.Cypher;
using Neo4j.Driver;
using NBP_backend.Cache;
using Microsoft.Extensions.Caching.Distributed;
using System.Text.Json;

namespace NBP_backend.Services

{
    public class UserServices
    {
        private readonly IGraphClient _client;

        private ICacheProvider cacheProvider { get; set; }
        public UserServices(IGraphClient client, ICacheProvider cacheProvider)
        {
            _client = client;
            this.cacheProvider = cacheProvider;
        }

        public  List<User> GetAll()
        {

            //List<string> l1 =  await db.ListRangeAsnyc() 

            List<User> users = new List<User>();
            //var users2 = _client.Cypher.Match("(n:WeatherForecast)")
            //                         .Return(n => n.As<User>()).ResultsAsync;
            
            var res = _client.Cypher.Match("(n:User)")
                                    .With("n{.*, returnID:id(n)} as n")
                                    .Return(n => n.As<User>()).ResultsAsync.Result;
            var us = res.ToList();
            foreach (var x in res)
            {
                users.Add(x);
            }

            foreach (var r in users)
            {
                cacheProvider.SetInHashSet("users", r.returnID.ToString(), JsonSerializer.Serialize(r));
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

        public async void CreateUser(String username, String password, String Name, String SurName)
        {
            User user = new User();
            user.UserName = username;
            user.Password = password;
            user.Name = Name;
            user.Surname = SurName;
            await _client.Cypher
                      .Create("(n:User $dept)")
                      .WithParam("dept", user)
                      .ExecuteWithoutResultsAsync();
           
        }

        public async Task<int> LogInUser(String username, String password)
        {
            try
            {
                var redis = await cacheProvider.GetAsync<User>(username);
                if(redis != null)
                {
                    return redis.returnID;
                }

                var userr = await _client.Cypher.Match("(d:User)")
                                                .Where((User d) => d.UserName == username)
                                                .With("d{.*, returnID:id(d)} as u")
                                                .Return(u => u.As<User>()).ResultsAsync;
                var sr = userr.FirstOrDefault();

                if (sr != null)
                {
                    if (sr.Password == password)
                    {
                        await cacheProvider.SetAsync(username, sr, new DistributedCacheEntryOptions { AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(24) });
                        return sr.returnID;
                    }
                    else
                    {
                        return -1;
                    }
                }
                return -2;
            }
            catch(Exception e)
            {
                Console.WriteLine(e.StackTrace);
                return -5;
            }
        }

        public async Task<bool> FollowProduct(int IDUser, int IDProduct )
        {
            IDictionary<string, object> dict = new Dictionary<string, object>();
            dict.Add("ID", IDUser);
            dict.Add("ID2", IDProduct);
            try
            {
                //var rel = await _client.Cypher.Match("(d:User)-[v:FOLLOWING]-(c:Product)")
                //                  .Where("id(d) = $ID AND id(c) = $ID2")
                //                  .WithParams(dict)
                               

                await _client.Cypher.Match("(d:User), (c:Product)")
                                    .Where("id(d) = $ID AND id(c) = $ID2")
                                    .WithParams(dict)
                                    .Create("(d)-[:FOLLOWING]->(c)").ExecuteWithoutResultsAsync();
                return true;
            }
            catch(Exception e)
            {
                Console.WriteLine(e.StackTrace);
                return false;
            }

            
        }

        public async Task<bool> UnFollowProduct(int IDUser, int IDProduct)
        {
            IDictionary<string, object> dict = new Dictionary<string, object>();
            dict.Add("ID", IDUser);
            dict.Add("ID2", IDProduct);

            try
            {
               
                await _client.Cypher.Match("(d:User)-[v:FOLLOWING]-(c:Product)")
                                    .Where("id(d) = $ID AND id(c) = $ID2")
                                    .WithParams(dict)
                                    .Delete("v").ExecuteWithoutResultsAsync();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.StackTrace);
                return false;
            }


        }
    }
}
