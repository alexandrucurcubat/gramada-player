import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';

import { SearchService } from './search.service';
import { Video } from '../models/video.interface';
import { PlaylistAddDialogComponent } from '../playlist/playlist-add-dialog/playlist-add-dialog.component';
import { PlaylistService } from '../playlist/playlist.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  searchString = '';
  searchResults$: Observable<Video[]>;
  private subscription = new Subscription();

  constructor(
    private seachService: SearchService,
    private playlistService: PlaylistService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.searchResults$ = this.seachService.searchResults$;
  }

  onSearch() {
    this.seachService.search(this.searchString);
  }

  onClear() {
    this.searchString = '';
    this.seachService.clear();
  }

  onAdd(video: Video) {
    const dialogRef = this.dialog.open(PlaylistAddDialogComponent, {
      data: { title: video.title },
    });
    this.subscription.add(
      dialogRef.afterClosed().subscribe((canAdd: boolean) => {
        if (canAdd) {
          this.playlistService.add(video);
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
