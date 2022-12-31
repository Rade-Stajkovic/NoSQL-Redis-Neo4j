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
    public class CategoryServices
    {
        private readonly IGraphClient _client;

        public CategoryServices(IGraphClient client)
        {
            _client = client;
        }

        public async void CreateCategory(String name)
        {
            Category category = new Category();
            category.Name = name;
            await _client.Cypher
                      .Create("(n:Category $dept)")
                      .WithParam("dept", category)
                      .ExecuteWithoutResultsAsync();
        }
        public async Task<bool> AddProduct(int IDCategory, int IDProduct)
        {
            IDictionary<string, object> dict = new Dictionary<string, object>();
            dict.Add("ID", IDProduct);
            dict.Add("ID2", IDCategory);
            try
            {
                await _client.Cypher.Match("(d:Product), (c:Category)")
                                    .Where("id(d) = $ID AND id(c) = $ID2")
                                    .WithParams(dict)
                                    .Create("(d)-[:IN]->(c)").ExecuteWithoutResultsAsync();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.StackTrace);
                return false;
            }


        }

        public async Task<bool> RemoveProduct(int IDCategory, int IDProduct)
        {
            IDictionary<string, object> dict = new Dictionary<string, object>();
            dict.Add("ID", IDProduct);
            dict.Add("ID2", IDCategory);
            try
            {
                //provere
                await _client.Cypher.Match("(d:Product)-[v:IN]-(c:Category)")
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
