using System;
using System.Collections.Generic;
using BackEnd.WebsocketMessages;

namespace BackEnd.Models
{
    public partial class Account
    {
        public Account()
        {
            InverseAgentuserNavigation = new HashSet<Account>();
            Invoices = new HashSet<Invoice>();
            News = new HashSet<News>();
        }

        public string Username { get; set; } = null!;
        public string? Passwords { get; set; }
        public int? Accrole { get; set; }
        public string? Fullname { get; set; }
        public string? Addresss { get; set; }
        public string? Phone { get; set; }
        public string? Photo { get; set; }
        public string? Email { get; set; }
        public string? Verifycode { get; set; }
        public string? Agentuser { get; set; }
        public byte? Accstatus { get; set; }

        public virtual Roleacc? AccroleNavigation { get; set; }
        public virtual Account? AgentuserNavigation { get; set; }
        public virtual ICollection<Account> InverseAgentuserNavigation { get; set; }
        public virtual ICollection<Invoice> Invoices { get; set; }
        public virtual ICollection<News> News { get; set; }

        public virtual ICollection<MessageEntity> MessagesSent { get; set; }
        public virtual ICollection<MessageEntity> MessagesReceived { get; set; }
    }
}
