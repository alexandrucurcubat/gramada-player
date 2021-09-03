import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';

import { PlaylistRemoveDialogComponent } from './playlist-remove-dialog/playlist-remove-dialog.component';
import { PlaylistService } from './playlist.service';
import { Video } from '../models/video.interface';
import { UserService } from '../user/user.service';
import { User } from '../models/user.interface';
import { PlayerService } from '../player/player.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent implements OnInit, OnDestroy {
  isPlaying$: Observable<boolean>;
  isMuted$: Observable<boolean>;
  playlist$: Observable<Video[]>;
  playingVideo$: Observable<Video | null>;
  currentUser$: Observable<User | null>;
  private subscription = new Subscription();

  constructor(
    private dialog: MatDialog,
    private playerService: PlayerService,
    private playlistService: PlaylistService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.isPlaying$ = this.playerService.isPlaying$;
    this.playlist$ = this.playlistService.playlist$;
    this.playingVideo$ = this.playlistService.playingVideo$;
    this.currentUser$ = this.userService.currentUser$;
  }

  onRemove(video: Video) {
    const dialogRef = this.dialog.open(PlaylistRemoveDialogComponent, {
      data: { title: video.title },
    });
    this.subscription.add(
      dialogRef.afterClosed().subscribe((canRemove: boolean) => {
        if (canRemove) {
          this.playlistService.remove(video);
        }
      })
    );
  }

  onBoost(video: Video) {
    this.playlistService.boost(video);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
