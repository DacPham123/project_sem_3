using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.WebsocketMessages
{
    public class CreateMessageDto
    {
        public string RecipientUsername { get; set; }

        public string Content { get; set; }
    }
}