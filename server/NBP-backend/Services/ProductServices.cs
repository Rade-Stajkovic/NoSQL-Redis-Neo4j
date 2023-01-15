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

        public List<Product> GetAll()
        {
            List<Product> products = new List<Product>();
           
            var res = _client.Cypher.Match("(n:Product)")
                                     .Return(n => n.As<Product>()).ResultsAsync.Result;
            var us = res.ToList();
            foreach (var x in res)
            {
                products.Add(x);
            }
            return products;
        }

        public List<Product> SearchProducts(String search)
        {
            List<Product> products = new List<Product>();

            String name = ".*" + search + ".*";


            var res = _client.Cypher.Match("(n:Product)")
                                    .Where("n.Name =~ $name ")
                                    .WithParam("name", name)
                                    .Return(n => n.As<Product>()).ResultsAsync.Result;
            var us = res.ToList();
            foreach (var x in res)
            {
                products.Add(x);
            }
            return products;
        }


        public async void CreateProduct(String name)
        {
            Product product = new Product();
            product.Name = name;
            await _client.Cypher
                      .Create("(n:Product $dept)")
                      .WithParam("dept", product)
                      .ExecuteWithoutResultsAsync();
        }

        public async void DeleteProduct(String ID)
        {
            await _client.Cypher.Match("(p:Product)")
                                .Where("id(p) = $ID")
                                .WithParam("ID", ID)
                                
                                .Delete("p")
                                .ExecuteWithoutResultsAsync();

        }


    }
}
