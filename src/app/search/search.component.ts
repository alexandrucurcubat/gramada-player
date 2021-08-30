import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { SearchService } from './search.service';
import { Video } from '../models/video.interface';
import { PlaylistAddDialogComponent } from '../playlist/playlist-add-dialog/playlist-add-dialog.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchString = '';
  videos$: Observable<Video[]>;

  constructor(private seachService: SearchService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.videos$ = this.seachService.videos$;
  }

  onSearch() {
    this.seachService.search(this.searchString);
  }

  onClear() {
    this.searchString = '';
    this.seachService.clear();
  }

  onAdd(title: string, videoId: string) {
    const dialogRef = this.dialog.open(PlaylistAddDialogComponent, {
      data: { title },
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      console.log('add video', result);
    });
  }
}
