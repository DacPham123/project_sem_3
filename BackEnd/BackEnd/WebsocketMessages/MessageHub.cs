using System;
using BackEnd.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.WebsocketMessages
{
	public class MessageHub : Hub
	{
        private readonly IMessageRepository _messageRepository;
        private readonly DatabaseContext _db;
        private readonly IHubContext<PresenceHub> _presenceHub;
        private readonly PresenceTracker _presenceTracker;

        public MessageHub(IMessageRepository messageRepository,
                            DatabaseContext db,
                            IHubContext<PresenceHub> presenceHub,
                            PresenceTracker presenceTracker)
        {
            this._messageRepository = messageRepository;
            this._db = db;
            this._presenceHub = presenceHub;
            this._presenceTracker = presenceTracker;
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var otherUser = httpContext.Request.Query["user"].ToString();

            var currentUsername = Context.User.FindFirst("Username")?.Value;

            /// group name is a combination of sender & receiver follows a specific order
            var groupName = GetGroupName(currentUsername, otherUser);

            /// create group in SignalR WebSocker Hub
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            /// add current connectionId to group to tracking & update viewing message status
            await AddToGroup(groupName);

            /**
             * send message thread to the group
             */
            var messages = await _messageRepository.GetMessageThread(currentUsername, otherUser);
            await Clients.Group(groupName).SendAsync("ReceiveMessageThread", messages);
        }


        /**
         * Method to allow client to post data through Hub - Similar as HttpPost
         */
        public async Task SendMessage(CreateMessageDto createMessageDto)
        {
            /**
             * NOTE: email is the same as username in this example
             */
            var username = Context.User.FindFirst("Username")?.Value;

            if (username == createMessageDto.RecipientUsername.ToLower())
                throw new HubException("You cannot send messages to yourself");

            var sender = await _db.Accounts.Where(u => u.Username == username).FirstOrDefaultAsync();
            var recipient = await _db.Accounts.Where(u => u.Username == createMessageDto.RecipientUsername).FirstOrDefaultAsync();

            if (recipient == null)
                throw new HubException("Not found user");

            var message = new MessageEntity
            {
                Sender = sender,
                Recipient = recipient,
                SenderUsername = sender.Username,
                RecipientUsername = recipient.Username,
                Content = createMessageDto.Content
            };


            var groupName = GetGroupName(sender.Username, recipient.Username);

            /**
             * Track if the receiver is online on MessageHub, then update that the message is readed
             * Else If the receiver is offline on MessageHub but online on PresenceHub, then message will be send to PresenceHub instead of MessageHub
             */
            var group = await _messageRepository.GetMessageGroup(groupName);
            if (group.Connections.Any(x => x.Username == recipient.Username))
            {
                message.DateRead = DateTime.Now;
            }
            else
            {
                /**
                 * send message to PresenceHub from MessageHub
                 */
                var connectionIds = await _presenceTracker.GetConnectionsForUser(recipient.Username);
                if (connectionIds != null)
                {
                    await _presenceHub.Clients.Clients(connectionIds)
                        .SendAsync("NewMessageReceived", new { username = sender.Username });
                }
            }


            _messageRepository.AddMessage(message);

            if (await _messageRepository.SaveAllAsync())
            {
                await Clients.Group(groupName).SendAsync("NewMessage", new MessageDto()
                {
                    Id = message.Id,
                    SenderId = message.SenderId,
                    SenderUsername = message.SenderUsername,
                    RecipientId = message.RecipientId,
                    RecipientUsername = message.RecipientUsername,
                    Content = message.Content,
                    DateRead = message.DateRead,
                    MessageSent = message.MessageSent
                });
            }
        }


        public override async Task OnDisconnectedAsync(Exception exception)
        {
            /// MessageGroup purpose is to track viewing message status
            await RemoveFromMessageGroup();

            /**
             * Users will leave the group automatically
             */
            await base.OnDisconnectedAsync(exception);
        }


        /**
         * Create group name by a combination of sender & receiver.
         * To identify the group name, the group name must follow a specific rule such as order
         * CompareOrdinal(strA, strB) is less than 0 if strA is less than strB and reverse.
         */
        private string GetGroupName(string sender, string receiver)
        {
            var stringCompare = string.CompareOrdinal(sender, receiver);
            var groupName = (stringCompare < 0)
                            ? sender + "-" + receiver
                            : receiver + "-" + sender;

            return groupName;
        }


        /**
         * Purpose is to track reading message status on WebSocket
         * Track whether user is online & at the chat screen, if it is then message is readed
         */
        private async Task<bool> AddToGroup(string groupName)
        {
            var group = await _messageRepository.GetMessageGroup(groupName);
            var connection = new Connection(Context.ConnectionId, Context.User!.FindFirst("Username")!.Value);

            if (group == null)
            {
                group = new Group(groupName);
                _messageRepository.AddGroup(group);
            }

            group.Connections.Add(connection);

            return await _messageRepository.SaveAllAsync();
        }


        private async Task RemoveFromMessageGroup()
        {
            var connection = await _messageRepository.GetConnection(Context.ConnectionId);
            _messageRepository.RemoveConnection(connection);

            await _messageRepository.SaveAllAsync();
        }
    }
}

