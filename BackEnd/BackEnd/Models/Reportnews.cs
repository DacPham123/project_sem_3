using System;
using System.Collections.Generic;

namespace BackEnd.Models
{
    public partial class Reportnews
    {
        public int Reportid { get; set; }
        public int? Newsid { get; set; }
        public DateTime? Createdday { get; set; }
        public DateTime? Deadline { get; set; }
        public int? Reportstatus { get; set; }
        public string? Fromuser { get; set; }
        public string? Fromadmin { get; set; }
        public string? Touser { get; set; }
        public string? Remark { get; set; }
        public int? Politicsreason { get; set; }
        public int? Cheatreason { get; set; }
    }
}
