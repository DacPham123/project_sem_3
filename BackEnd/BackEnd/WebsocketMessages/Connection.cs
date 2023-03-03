using System;
namespace BackEnd.WebsocketMessages
{
    /**
     * Purpose is to track reading status on WebSocket
     * Track whether user is online & at the chat screen, if it is then message is readed
     */
    public class Connection
	{
        public Connection()
        {
        }

        public Connection(string connectionId, string username)
        {
            ConnectionId = connectionId;
            Username = username;
        }

        public string ConnectionId { get; set; }
        public string Username { get; set; }
    }
}

