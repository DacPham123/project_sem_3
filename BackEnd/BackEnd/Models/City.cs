using System;
using System.Collections.Generic;

namespace BackEnd.Models
{
    public partial class City
    {
        public City()
        {
            Wards = new HashSet<Ward>();
        }

        public int Cityid { get; set; }
        public string? Cityname { get; set; }
        public int? Privinceid { get; set; }

        public virtual Province? Privince { get; set; }
        public virtual ICollection<Ward> Wards { get; set; }
    }
}
