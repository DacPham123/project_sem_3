using System;
using System.Collections.Generic;

namespace BackEnd.Models
{
    public partial class Category
    {
        public Category()
        {
            News = new HashSet<News>();
        }

        public int Categoryid { get; set; }
        public string? Categoryname { get; set; }

        public virtual ICollection<News> News { get; set; }
    }
}
