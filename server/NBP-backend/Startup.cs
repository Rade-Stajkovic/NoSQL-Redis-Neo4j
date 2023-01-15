using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Neo4jClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NBP_backend.Services;
using Microsoft.Extensions.Caching.StackExchangeRedis;
using NBP_backend.Cache;

namespace NBP_backend
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "NBP_backend", Version = "v1" });
            });

            services.AddSingleton<UserServices>();
            services.AddSingleton<ProductServices>();
            services.AddSingleton<MarketServices>();
            services.AddSingleton<CategoryServices>();
            services.AddSingleton<ReviewServices>();
            var client = new BoltGraphClient(new Uri("neo4j+s://ea17674b.databases.neo4j.io"), "neo4j", "PbWMDupdf6n1LrZRBjibXkoJZ05YffMXokUZTFwyRrk");
            client.ConnectAsync();
            services.AddSingleton<IGraphClient>(client);

            services.AddTransient<ICacheProvider, CacheProvider>();
            services.AddStackExchangeRedisCache(options => {
                options.Configuration = Configuration.GetConnectionString("Redis");
              }
                );
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "NBP_backend v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
