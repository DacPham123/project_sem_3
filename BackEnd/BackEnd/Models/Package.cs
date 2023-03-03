using System;
using System.Collections.Generic;

namespace BackEnd.Models
{
    public partial class Package
    {
        public Package()
        {
            Invoices = new HashSet<Invoice>();
        }

        public int Packageid { get; set; }
        public string? Packagetitle { get; set; }
        public decimal? Packageprice { get; set; }
        public int? Packagedate { get; set; }
        public byte? NoVvipnews { get; set; }
        public byte? NoVipnews { get; set; }
        public byte? NoNormalnews { get; set; }
        public string? Packagecontent { get; set; }

        public virtual ICollection<Invoice> Invoices { get; set; }
    }
}
