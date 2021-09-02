import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UserService } from './user/user.service';
import { NewUserDialogComponent } from './user/new-user-dialog/new-user-dialog.component';
import { Subscription } from 'rxjs';
import { PlaylistService } from './playlist/playlist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  constructor(
    private userService: UserService,
    private playlistService: PlaylistService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.userService.currentUsername$.subscribe((username) => {
        if (!username) {
          this.dialog.open(NewUserDialogComponent, {
            disableClose: true,
          });
        }
      })
    );
    this.playlistService.initPlaylist();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
