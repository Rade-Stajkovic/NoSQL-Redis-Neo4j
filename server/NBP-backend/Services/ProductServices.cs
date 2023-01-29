using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Neo4jClient;
using NBP_backend.Models;
using System.Collections;
<<<<<<< HEAD
using System.Text.RegularExpressions;
=======
using System.ComponentModel;
using System.Collections.Specialized;
using System.Xml.Linq;
>>>>>>> a323e7204c37e88ea888d4797c2d59124f880e9a

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
      
        public async Task<Product> GetProduct(int ID)
        {
            var results = await _client.Cypher
                .Match("(n:Product)")
                .Where("id(n)=$id")
                .WithParam("id", ID)
                .With("n{.*, ID:id(n)} AS u")
                .Return(u => u.As<Product>())
                .ResultsAsync;

            return results.FirstOrDefault();
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

        public async Task<List<Stored>> GetMoreDetails(int IdProduct)
        {
            var res = await _client.Cypher.Match("(n:Product) - [v:STORED_IN]-(c:Market)")
                        .Where("id(n) = " + IdProduct)
                        .With("n{.*, Market:c.Name, Price:v.price, Sale:v.sale, Available:v.available} as n")
                        .Return(n => n.As<Stored>()).ResultsAsync;
            var us = res.ToList();
            List<Stored> ret = new List<Stored>();
            foreach(var x in us )
            {
                ret.Add(x);
            }
            return ret;
        }


    }
}
