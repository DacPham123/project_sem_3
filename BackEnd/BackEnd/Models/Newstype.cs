using System;
using System.Collections.Generic;

namespace BackEnd.Models
{
    public partial class Newstype
    {
        public Newstype()
        {
            News = new HashSet<News>();
        }

        public int Newstypeid { get; set; }
        public string? Newstype1 { get; set; }

        public virtual ICollection<News> News { get; set; }
    }
}
