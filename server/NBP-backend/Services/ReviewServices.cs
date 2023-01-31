using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Neo4jClient;
using NBP_backend.Models;
using System.Collections;
using Neo4jClient.Cypher;
using NBP_backend.Cache;
using System.Xml.Linq;

namespace NBP_backend.Services
{
    public class ReviewServices
    {
        private readonly IGraphClient _client;

        private ICacheProvider _cacheProvider { get; set; }

        public ReviewServices(IGraphClient client, ICacheProvider cacheProvider)
        {
            _client = client;
            _cacheProvider = cacheProvider;
        }

        public async void ReviewPoduct(String text, String username, int idProduct,bool recommend)
        {
            Review review = new Review();
            review.Username = username;
            review.Text = text;
            review.date = DateTime.Now;
            review.Recommend = recommend;
            var review_returned = await _client.Cypher
                      .Create("(n:Review $dept)")
                      .WithParam("dept", review)
                      .With("n{.*, ReturnID:id(n)} as n")
                      .Return(n => n.As<Review>()).ResultsAsync;
            var review_returnedd = review_returned.FirstOrDefault();

            IDictionary<string, object> dict = new Dictionary<string, object>();
            dict.Add("ID", review_returnedd.ReturnID);
            dict.Add("ID2", idProduct);
            await _client.Cypher.Match("(d:Review), (c:Product)")
                                    .Where("id(d) = $ID AND id(c) = $ID2")
                                    .WithParams(dict)
                                    .Create("(d)-[:REVIEWED]->(c)").ExecuteWithoutResultsAsync();

            IDictionary<string, object> dict2 = new Dictionary<string, object>();
            dict2.Add("ID", review_returnedd.ReturnID);
            dict2.Add("username", username);
            await _client.Cypher.Match("(d:Review), (c:User)")
                        .Where("id(d) = $ID AND c.UserName = $username")
                        .WithParams(dict2)
                        .Create("(d)-[:MY_REVIEW]->(c)").ExecuteWithoutResultsAsync();

         await _client.Cypher.Match("(p:Product)")
                                    .Where("id(p) ="+idProduct)
                                 
                                    .Set("p.Reviews = p.Reviews + 1, p.GoodReviews = p.GoodReviews +" + (recommend ? 1 : 0))
                                    .ExecuteWithoutResultsAsync();
        }

        public async void DeleteReviewPoduct(int idReview)
        {
            await _client.Cypher.Match("(p:Review)")
                                 .Where("id(p) = $ID")
                                 .WithParam("ID", idReview)

                                 .DetachDelete("p")
                                 .ExecuteWithoutResultsAsync();

        }
    }
}

