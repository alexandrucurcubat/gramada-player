import { Injectable } from '@angular/core';

import {
  Firestore,
  collection,
  query,
  onSnapshot,
  doc,
  serverTimestamp,
  deleteDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { orderBy } from '@firebase/firestore';
import { BehaviorSubject } from 'rxjs';

import { Video } from '../models/video.interface';

@Injectable({ providedIn: 'root' })
export class PlaylistService {
  private playlistSubject = new BehaviorSubject<Video[]>([]);
  playlist$ = this.playlistSubject.asObservable();

  constructor(private db: Firestore, private _snackBar: MatSnackBar) {
    const playlistQuery = query(
      collection(db, 'playlist'),
      orderBy('isPlaying', 'desc'),
      orderBy('boost', 'desc'),
      orderBy('addedTimestamp')
    );
    onSnapshot(playlistQuery, (querySnapshot) => {
      const playlist: Video[] = [];
      querySnapshot.forEach((doc) => {
        playlist.push(doc.data() as Video);
      });
      this.playlistSubject.next(playlist);
    });
  }

  async add(video: Video) {
    try {
      const docRef = doc(this.db, 'playlist', video.videoId);
      await setDoc(docRef, {
        ...video,
        isPlaying: false,
        boost: 0,
        addedTimestamp: serverTimestamp(),
      });
      this._snackBar.open('Video added to playlist', 'Ok', { duration: 2000 });
    } catch (error) {
      this._snackBar.open('Something went wrong...', 'Ok', { duration: 2000 });
      console.error(error);
    }
  }

  async remove(video: Video) {
    try {
      const docRef = doc(this.db, 'playlist', video.videoId);
      await deleteDoc(docRef);
      this._snackBar.open('Video removed from playlist', 'Ok', {
        duration: 2000,
      });
    } catch (error) {
      this._snackBar.open('Something went wrong...', 'Ok', { duration: 2000 });
      console.error(error);
    }
  }

  async setIsPlaying(isPlaying: boolean, video: Video) {
    try {
      const docRef = doc(this.db, 'playlist', video.videoId);
      await updateDoc(docRef, { isPlaying });
    } catch (error) {
      this._snackBar.open('Something went wrong...', 'Ok', { duration: 2000 });
      console.error(error);
    }
  }

  async updateTimestamp(video: Video) {
    try {
      const docRef = doc(this.db, 'playlist', video.videoId);
      await updateDoc(docRef, {
        addedTimestamp: serverTimestamp(),
      });
    } catch (error) {
      this._snackBar.open('Something went wrong...', 'Ok', { duration: 2000 });
      console.error(error);
    }
  }

  async resetBoost(video: Video) {
    try {
      const docRef = doc(this.db, 'playlist', video.videoId);
      await updateDoc(docRef, {
        boost: 0,
      });
    } catch (error) {
      this._snackBar.open('Something went wrong...', 'Ok', { duration: 2000 });
      console.error(error);
    }
  }
}
