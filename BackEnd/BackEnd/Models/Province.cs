using System;
using System.Collections.Generic;

namespace BackEnd.Models
{
    public partial class Province
    {
        public Province()
        {
            Cities = new HashSet<City>();
        }

        public int Provinceid { get; set; }
        public string? Provincename { get; set; }

        public virtual ICollection<City> Cities { get; set; }
    }
}
