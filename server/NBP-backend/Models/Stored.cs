using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NBP_backend.Models
{
    public class Stored
    {
        public Market Market { get; set; }

        public Product Product { get; set; }

        public double Price { get; set; }

        public bool Sale { get; set; }

        public bool Available { get; set; }

    }
}
