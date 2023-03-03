using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.WebsocketMessages
{
    public interface IMessageRepository
    {
        void AddMessage(MessageEntity message);

 		void DeleteMessage(MessageEntity message);

 		Task<MessageEntity> GetMessage(int id);

 		Task<List<MessageDto>> GetMessagesForUser(MessageParams messageParams);

 		Task<IEnumerable<MessageDto>> GetMessageThread(string currentUsername, string recipientUsername);

 		Task<bool> SaveAllAsync();


        /**
		 * SignalR methods to track viewing message status
		 */
        void AddGroup(Group group);
        void RemoveConnection(Connection connection);
        Task<Connection> GetConnection(string connectionId);
        Task<Group> GetMessageGroup(string groupName);
    }
}