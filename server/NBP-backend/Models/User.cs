using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NBP_backend.Models
{
    public class User
    {
        public int ID { get; set; }

        public String UserName { get; set; }

        public String Password
        {
            get; set;
        } 

        public List<Product> Follow { get; set; }

        public  List<Product> Searched { get; set; }






    }
}
