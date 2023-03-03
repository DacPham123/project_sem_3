using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackEnd.Models;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.WebsocketMessages
{
    public class MessageRepository : IMessageRepository
    {
        private DatabaseContext _context;

        public MessageRepository(DatabaseContext context)
        {
            _context = context;
        }

        public void AddMessage(MessageEntity message)
        {
            _context.Messages.Add(message);
        }

        public void DeleteMessage(MessageEntity message)
        {
            _context.Messages.Remove(message);
        }

        public async Task<MessageEntity> GetMessage(int id)
        {
            return await _context.Messages
                .Include(u => u.Sender)
                .Include(u => u.Recipient)
                .SingleOrDefaultAsync(m => m.Id == id);
        }

        public async Task<List<MessageDto>> GetMessagesForUser(MessageParams messageParams)
        {
            var query = _context.Messages.OrderByDescending(m => m.MessageSent).AsQueryable();

            query = messageParams.Container switch
            {
                "Inbox" => query.Where(u => u.Recipient.Username == messageParams.Username && u.RecipientDeleted == false),
                "Outbox" => query.Where(u => u.Sender.Username == messageParams.Username && u.SenderDeleted == false),
                /// by default, get unread messages;
                _ => query.Where(u => u.Recipient.Username == messageParams.Username && u.RecipientDeleted == false && u.DateRead == null)
            };

            List<MessageEntity> messageList = await query.Include(u => u.Sender).Include(u => u.Recipient).ToListAsync();

            return messageList.Select(x => new MessageDto()
            {
                Id = x.Id,
                SenderId = x.SenderId,
                SenderUsername = x.SenderUsername,
                RecipientId = x.RecipientId,
                RecipientUsername = x.RecipientUsername,
                Content = x.Content,
                DateRead = x.DateRead,
                MessageSent = x.MessageSent
            }).ToList();
        }

        public async Task<IEnumerable<MessageDto>> GetMessageThread(string currentUsername, string recipientUsername)
        {
            var messages = await _context.Messages
                .Include(u => u.Sender)
                .Include(u => u.Recipient)
                .Where(m => (m.Recipient.Username == currentUsername && m.Sender.Username == recipientUsername && m.RecipientDeleted == false)
                            || (m.Recipient.Username == recipientUsername && m.Sender.Username == currentUsername && m.SenderDeleted == false))
                .OrderBy(m => m.MessageSent)
                .ToListAsync();

            /// mark messages as read after opening
            var unreadMessages = messages.Where(m => m.DateRead == null && m.Recipient.Username == currentUsername).ToList();

            if (unreadMessages.Any())
            {
                foreach (var message in unreadMessages)
                {
                    message.DateRead = DateTime.Now;
                }

                await _context.SaveChangesAsync();
            }
            return messages.Select(m => new MessageDto()
            {
                Id = m.Id,
                SenderId = m.SenderId,
                SenderUsername = m.SenderUsername,
                RecipientId = m.RecipientId,
                RecipientUsername = m.RecipientUsername,
                Content = m.Content,
                DateRead = m.DateRead,
                MessageSent = m.MessageSent
            }).ToList();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }


        /**
		 * SignalR methods to track viewing message status
		 */
        public void AddGroup(Group group)
        {
            _context.Groups.Add(group);
        }

        public void RemoveConnection(Connection connection)
        {
            _context.Connections.Remove(connection);
        }


        public async Task<Connection> GetConnection(string connectionId)
        {
            return await _context.Connections.FindAsync(connectionId);
        }


        public async Task<Group> GetMessageGroup(string groupName)
        {
            return await _context.Groups
                .Include(x => x.Connections)
                .FirstOrDefaultAsync(x => x.Name == groupName);
        }
    }
}