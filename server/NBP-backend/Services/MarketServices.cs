﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Neo4jClient;
using NBP_backend.Models;
using System.Collections;
using Neo4jClient.Cypher;
using NBP_backend.Cache;
using System.Text.Json;

namespace NBP_backend.Services
{
    public class MarketServices
    {
        private readonly IGraphClient _client;
        private readonly ICacheProvider _cacheProvider;

        public MarketServices(IGraphClient client, ICacheProvider _cacheProvider)
        {
            _client = client;
            this._cacheProvider = _cacheProvider;
        }

        public List<Market> GetAll()
        {
            List<Market> markets = new List<Market>();

            var res = _client.Cypher.Match("(n:Market)")
                                    .Return(n => n.As<Market>()).ResultsAsync.Result;
                 
                                    
            var us = res.ToList();
            foreach (var x in res)
            {
                markets.Add(x);
            }
            return markets;
        }

        public List<Product> GetAllProducts(int IDMarket)
        {
            List<Product> products = new List<Product>();

         

            var res = _client.Cypher.Match("(n:Market)<-[STORED_IN]-(p:Product)")
                                    .Where("id(n) = $IDM")
                                    .WithParam("IDM", IDMarket)

                                    .Return(p => p.As<Product>()).ResultsAsync.Result;
            var us = res.ToList();
            foreach (var x in res)
            {
                products.Add(x);
            }
            return products;
        }

        public async void CreateMarket(String name)
        {
            Market market = new Market();
            market.Name = name;
            await _client.Cypher
                      .Create("(n:Market $dept)")
                      .WithParam("dept", market)
                      .ExecuteWithoutResultsAsync();
        }

        public async void DeleteMarket(String ID)
        {
            await _client.Cypher.Match("(p:Market)")
                                .Where("id(p) = $ID")
                                .WithParam("ID", ID)

                                .Delete("p")
                                .ExecuteWithoutResultsAsync();

        }

        public async Task<bool> StoreProduct(int IDMarket, int IDProduct, int price, bool sale, bool available)
        {
            var market = await _client.Cypher.Match("(d:Market)")
                                     .Where("id(d) = $ID")
                                     .WithParam("ID", IDMarket)
                                     .Return(d => d.As<User>()).ResultsAsync;
            var product = await _client.Cypher.Match("(d:Product)")
                                     .Where("id(d) = $ID")
                                     .WithParam("ID", IDProduct)
                                     .Return(d => d.As<Product>()).ResultsAsync;
            var sr = market.FirstOrDefault();
            var pr = product.FirstOrDefault();
            IDictionary<string, object> dict = new Dictionary<string, object>();
            dict.Add("ID", IDMarket);
            dict.Add("ID2", IDProduct);

            IDictionary<string, object> dict2 = new Dictionary<string, object>();
            dict2.Add("price", price);
            dict2.Add("sale", sale);
            dict2.Add("available", available);

            try
            {
                await _client.Cypher.Match("(d:Market), (c:Product)")
                                    .Where("id(d) = $ID AND id(c) = $ID2")
                                    .WithParams(dict)
                                    .Create("(c)-[:STORED_IN {price: $price, sale:$sale, available:$available}]->(d) ").WithParams(dict2).ExecuteWithoutResultsAsync();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.StackTrace);
                return false;
            }




        }

        public async Task<bool> ChangeRelAttributes(int IDMarket, int IDProduct, int newPrice, bool newSale, bool newAvailable)
        {
            IDictionary<string, object> dict = new Dictionary<string, object>();
            dict.Add("ID", IDMarket);
            dict.Add("ID2", IDProduct);

            IDictionary<string, object> dict2 = new Dictionary<string, object>();
            dict2.Add("newPrice", newPrice);
            dict2.Add("newSale", newSale);
            dict2.Add("newAvailable", newAvailable);
            try
            {
                await _client.Cypher.Match("(d:Product)-[v:STORED_IN]-(c:Market)")
                                    .Where("id(d) = $ID2 AND id(c) = $ID")
                                    .WithParams(dict)
                                    .Set("v.price = $newPrice, v.sale = $newSale, v.available =  $newAvailable ")
                                    .WithParams(dict2).ExecuteWithoutResultsAsync();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.StackTrace);
                return false;
            }


        }

        public async Task<bool> UnstoreProduct(int IDMarekt, int IDProduct)
        {
            IDictionary<string, object> dict = new Dictionary<string, object>();
            dict.Add("ID", IDMarekt);
            dict.Add("ID2", IDProduct);
            try
            {
                await _client.Cypher.Match("(d:Product)-[v:STORED_IN]-(c:Market)")
                                    .Where("id(d) = $ID2 AND id(c) = $ID")
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

        public async Task<List<Product>> GetAllProductsOnSale(int IDMarket)
        { 
            List<Product> products = new List<Product>();
            string s = "MarketSale" + IDMarket;
            var redis = _cacheProvider.GetAllFromHashSet<Product>(s);
            if (redis.Count == 0)
            {
                try
                {
                    var prod = await _client.Cypher.Match("(d:Product)-[v:STORED_IN]-(c:Market)")
                                        .Where("id(c) = $ID AND v.sale = " + true)
                                        .With("d{.*, ID:id(d)} as u")
                                        .WithParam("ID", IDMarket)
                                        .Return(u => u.As<Product>()).ResultsAsync;
                    var prod2 = prod.ToList();

                    foreach (var p in prod2)
                    {
                        products.Add(p);
                        _cacheProvider.SetInHashSet(s, p.ID.ToString(), JsonSerializer.Serialize(p));
                    }
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                }
                return products;
            }

            else return redis;
            
        }
        
    }
}
