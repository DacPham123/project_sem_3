using System;
using System.Collections.Generic;

namespace BackEnd.Models
{
    public partial class CateTofhouse
    {
        public CateTofhouse()
        {
            News = new HashSet<News>();
        }

        public int CateTofhouseid { get; set; }
        public string? CateTofhousename { get; set; }

        public virtual ICollection<News> News { get; set; }
    }
}
