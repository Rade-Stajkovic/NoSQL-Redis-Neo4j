using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace NBP_backend.Models
{
    public class Category
    {
        
        public int ID { get; set; }

         public String Name
        {
            get; set;
        }

        public List<Product> Products
        {
            get; set;
        }


    }
}
