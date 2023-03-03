using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using BackEnd.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.WebsocketMessages
{
    [Authorize]
    [ApiController]
 	[Route("api/[controller]")]
    public class MessagesController : ControllerBase
    {
        private readonly IMessageRepository _messageRepository;
        private readonly DatabaseContext _db;

        public MessagesController(IMessageRepository messageRepository, DatabaseContext db)
        {
            _messageRepository = messageRepository;
            _db = db;
        }


        [HttpPost]
        public async Task<ActionResult<MessageDto>> CreateMessage(CreateMessageDto createMessageDto)
        {
            var username = User.FindFirst("Username")?.Value;

            if (username == createMessageDto.RecipientUsername.ToLower())
                return BadRequest("You cannot send messages to yourself");

            var sender = await _db.Accounts.Where(u => u.Username == username).FirstOrDefaultAsync();
            var recipient = await _db.Accounts.Where(u => u.Username == createMessageDto.RecipientUsername).FirstOrDefaultAsync();

            if (recipient == null)
                return NotFound();

            var message = new MessageEntity
            {
                Sender = sender,
                Recipient = recipient,
                SenderUsername = sender.Username,
                RecipientUsername = recipient.Username,
                Content = createMessageDto.Content
            };

            _messageRepository.AddMessage(message);

            if (await _messageRepository.SaveAllAsync())
                return Ok(new MessageDto
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
                //return Ok(_mapper.Map<MessageDto>(message));

            return BadRequest("Failed to send message");
        }

        /**
         * Getting Inbox / Outbox messages for individual
         */
        [HttpGet]
        public async Task<ActionResult<List<MessageDto>>> GetMessagesForUser([FromQuery] MessageParams messageParams)
        {
            messageParams.Username = User.FindFirst("Username")!.Value;

            List<MessageDto> messages = await _messageRepository.GetMessagesForUser(messageParams);

            return messages;
        }


        /**
         * Chat screen - Message Thread
         */
        [HttpGet("thread/{username}")]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessageThread(string username)
        {
            var currentUsername = User.FindFirst("Username")!.Value;

            return Ok(await _messageRepository.GetMessageThread(currentUsername, username));
        }


        /**
         * Delete chat message
         */
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMessage(int id)
        {
            var currentUsername = User.FindFirst("Username")!.Value;

            var message = await _messageRepository.GetMessage(id);

            if (message.Sender.Username != currentUsername && message.Recipient.Username != currentUsername)
                return Unauthorized();

            if (message.Sender.Username == currentUsername)
                message.SenderDeleted = true;

            if (message.Recipient.Username == currentUsername)
                message.RecipientDeleted = true;

            if (message.SenderDeleted && message.RecipientDeleted)
                _messageRepository.DeleteMessage(message);

            if (await _messageRepository.SaveAllAsync())
                return Ok();

            return BadRequest("Problem deleting the message");
        }
    }
}