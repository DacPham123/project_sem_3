using System;
using System.Collections.Generic;

namespace BackEnd.Models
{
    public partial class Newsimage
    {
        public int Newsimagesid { get; set; }
        public int? Newsid { get; set; }
        public string? Photo { get; set; }

        public virtual News? News { get; set; }
    }
}
