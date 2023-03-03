using System;
using System.Collections.Generic;

namespace BackEnd.Models
{
    public partial class Roleacc
    {
        public Roleacc()
        {
            Accounts = new HashSet<Account>();
        }

        public int Roleid { get; set; }
        public string? Roletitle { get; set; }

        public virtual ICollection<Account> Accounts { get; set; }
    }
}
