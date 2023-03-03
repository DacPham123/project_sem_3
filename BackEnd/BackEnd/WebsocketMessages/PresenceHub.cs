using System;
using Microsoft.AspNetCore.SignalR;

namespace BackEnd.WebsocketMessages
{
	public class PresenceHub : Hub
	{
        private readonly PresenceTracker _presenceTracker;

        public PresenceHub(PresenceTracker presenceTracker)
        {
            _presenceTracker = presenceTracker;
        }


        public override async Task OnConnectedAsync()
        {
            await _presenceTracker.UserConnected(Context.User.FindFirst("Username")!.Value, Context.ConnectionId);

            var currentUsers = await _presenceTracker.GetOnlineUsers();
            await Clients.All.SendAsync("GetOnlineUsers", currentUsers);
        }


        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await _presenceTracker.UserDisconnected(Context.User.FindFirst("Username")!.Value, Context.ConnectionId);

            var currentUsers = await _presenceTracker.GetOnlineUsers();
            await Clients.All.SendAsync("GetOnlineUsers", currentUsers);
            await base.OnDisconnectedAsync(exception);
        }
    }
}

