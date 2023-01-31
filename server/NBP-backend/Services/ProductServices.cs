using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Neo4jClient;
using NBP_backend.Models;
using System.Collections;
using NBP_backend.Services.Fajlovi;
using System.Text.RegularExpressions;

using System.ComponentModel;
using System.Collections.Specialized;
using System.Xml.Linq;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace NBP_backend.Services
{
    public class ProductServices
    {
        private readonly IGraphClient _client;

        public IWebHostEnvironment _webHost;

        public ProductServices(IGraphClient client, IWebHostEnvironment hostingEnvironment)
        {
            _client = client;
            _webHost = hostingEnvironment;
        }

   
        public List<Product> GetAll()
        {
            List<Product> products = new List<Product>();

            var res = _client.Cypher
                .Match("(n:Product)")
                .With("n{.*, ID:id(n)} AS u")
                .Return(u => u.As<Product>())
                .ResultsAsync.Result;
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


        public async void CreateProduct(String name, FileUpload file)
        {
            Product product = new Product();
            product.Name = name;

            if (file.file.Length > 0)
            {
                string path = _webHost.WebRootPath + "\\PicturesProduct\\";
                if (!Directory.Exists(path)) Directory.CreateDirectory(path);
                string newname = name + System.IO.Path.GetExtension(file.file.FileName);
                using (FileStream fileStream = System.IO.File.Create(path + newname))
                {
                    file.file.CopyTo(fileStream);
                    fileStream.Flush();
                }
                product.Picture = newname;
            }
            else product.Picture = "def.jpg";

            await _client.Cypher
                      .Create("(n:Product $dept)")
                      .WithParam("dept", product)
                      .ExecuteWithoutResultsAsync();
        }

        public async void DeleteProduct(int ID)
        {
            var prod = await _client.Cypher.Match("(p:Product)")
                                .Where("id(p) = $ID")
                                .WithParam("ID", ID)
                                .Return(p => p.As<Product>()).ResultsAsync;
            var pr = prod.FirstOrDefault();
            if(pr.Picture != "def.jpg")
            {
                string path = _webHost.WebRootPath + "\\PicturesProduct\\";
                if (!Directory.Exists(path))
                {
                    Console.WriteLine("Oxi");
                }
                path += pr.Picture;
                if(System.IO.File.Exists(path)) System.IO.File.Delete(path);
            }
            await _client.Cypher.Match("(p:Product)")
                                .Where("id(p) = $ID")
                                .WithParam("ID", ID)
                                .DetachDelete("p").ExecuteWithoutResultsAsync();
        }

        public async Task<List<Stored>> GetMoreDetails(int IdProduct)
        {
            var res = await _client.Cypher.Match("(n:Product) - [v:STORED_IN]-(c:Market)")
                        .Where("id(n) = " + IdProduct)
                        .With("n{.*,  Market:c.Name, Price:v.price, Sale:v.sale, Available:v.available} as n")
                        .Return(n => n.As<Stored>()).ResultsAsync;
            var us = res.ToList();
            List<Stored> ret = new List<Stored>();
            foreach (var x in us)
            {
                ret.Add(x);
            }
            return ret;
        }

    }
}
