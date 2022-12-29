using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
namespace NBP_backend.Models
{
    public class Market
    {
        
        int ID;
        
        String Name;

        List<Stored> StoredProducts;

        List<Category> Categories;


    }
}
