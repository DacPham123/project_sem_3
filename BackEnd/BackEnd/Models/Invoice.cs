using System;
using System.Collections.Generic;

namespace BackEnd.Models
{
    public partial class Invoice
    {
        public int Invoiceid { get; set; }
        public decimal? Price { get; set; }
        public int? Packageid { get; set; }
        public string? Username { get; set; }
        public DateTime? Paymentdate { get; set; }
        public DateTime? Expire { get; set; }
        public string? Paymentid { get; set; }
        public byte? Invoicestatus { get; set; }

        public virtual Package? Package { get; set; }
        public virtual Account? UsernameNavigation { get; set; }
    }
}
