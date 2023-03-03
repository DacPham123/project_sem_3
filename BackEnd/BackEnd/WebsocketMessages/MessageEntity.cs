using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackEnd.Models;

namespace BackEnd.WebsocketMessages
{
    public class MessageEntity
    {
        public int Id { get; set; }

         /**
          * By default, .NET use AppUserId as the foreign key with format ClassNameId
          * However, we need 2 separated AppUserId here which are sender & recipient
          * Therefore, we need to specify the foreign key.
          * We also need to restric delete
          * In summary, we need to define it in OnModelCreating
          */
         public string SenderId { get; set; }
         public string SenderUsername { get; set; }
         public virtual Account Sender { get; set; }

         public string RecipientId { get; set; }
         public string RecipientUsername { get; set; }
         public virtual Account Recipient { get; set; }

         public string Content { get; set; }

         public DateTime? DateRead { get; set; }
         public DateTime MessageSent { get; set; } = DateTime.Now;

         public bool SenderDeleted { get; set; }
         public bool RecipientDeleted { get; set; }
    }
}