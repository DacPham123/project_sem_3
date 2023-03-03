import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PresenceService } from 'src/app/message/presence.service';

@Component({
  selector: 'logout',
  templateUrl: 'logout.component.html'
})
export class LogoutComponent implements OnInit {

 
  constructor(
   private router: Router, private presenceService: PresenceService
  ) { }

  ngOnInit(): void {
    /// stop signalR WebSocket connection for stop sending message
    this.presenceService.stopHubConnection();

    localStorage.clear();
    this.router.navigate(["/login"]);

  }
}
