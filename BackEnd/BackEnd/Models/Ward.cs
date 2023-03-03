using System;
using System.Collections.Generic;

namespace BackEnd.Models
{
    public partial class Ward
    {
        public Ward()
        {
            News = new HashSet<News>();
        }

        public int Wardid { get; set; }
        public string? Wardname { get; set; }
        public int? Cityid { get; set; }

        public virtual City? City { get; set; }
        public virtual ICollection<News> News { get; set; }
    }
}
