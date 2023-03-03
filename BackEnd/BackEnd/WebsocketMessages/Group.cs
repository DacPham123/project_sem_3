using System;
using System.ComponentModel.DataAnnotations;

namespace BackEnd.WebsocketMessages
{
	public class Group
	{
        /**
         * Purpose is to track reading status on WebSocket
         * Track whether user is online & at the chat screen, if it is then message is readed
         */
        public Group()
        {
        }

        public Group(string name)
        {
            Name = name;
        }

        [Key]
        public string Name { get; set; }
        public virtual ICollection<Connection> Connections { get; set; } = new List<Connection>();
    }
}

