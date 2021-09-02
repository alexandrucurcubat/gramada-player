import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { SearchResult } from '../models/search-result.interface';
import { Video } from '../models/video.interface';

const MAX_RESULTS = 25;

@Injectable({ providedIn: 'root' })
export class SearchService implements OnDestroy {
  private searchResultsSubject = new BehaviorSubject<Video[]>([]);
  searchResults$ = this.searchResultsSubject.asObservable();
  private subscription = new Subscription();

  constructor(private http: HttpClient) {}

  search(searchString: string) {
    const url = `${environment.API_URL}?q=${searchString}&key=${environment.API_KEY}&part=snippet&type=video&maxResults=${MAX_RESULTS}`;
    return this.subscription.add(
      this.http
        .get<SearchResult>(url)
        .pipe(
          map((searchResult) => {
            return searchResult.items.map((item) => {
              return {
                videoId: item.id.videoId,
                channelTitle: item.snippet.channelTitle,
                description: item.snippet.description,
                publishTime: item.snippet.publishTime,
                thumbnail: {
                  url: item.snippet.thumbnails.high.url,
                  width: item.snippet.thumbnails.high.width,
                  height: item.snippet.thumbnails.high.height,
                },
                title: item.snippet.title,
              };
            });
          })
        )
        .subscribe((videos) => this.searchResultsSubject.next(videos))
    );
  }

  clear() {
    this.searchResultsSubject.next([]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
