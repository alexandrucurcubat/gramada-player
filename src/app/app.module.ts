import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { YouTubePlayerModule } from '@angular/youtube-player';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { YoutubePlayerComponent } from './youtube-player/youtube-player.component';
import { SearchComponent } from './search/search.component';
import { AccountComponent } from './account/account.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistActionsComponent } from './playlist/playlist-actions/playlist-actions.component';
import { RemoveVideoDialogComponent } from './playlist/remove-video-dialog/remove-video-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    YoutubePlayerComponent,
    SearchComponent,
    AccountComponent,
    PlaylistComponent,
    PlaylistActionsComponent,
    RemoveVideoDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    YouTubePlayerModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
