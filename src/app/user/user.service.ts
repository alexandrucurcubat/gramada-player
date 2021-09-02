import { Injectable, OnDestroy } from '@angular/core';
import {
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Subscription } from 'rxjs';

import { User } from '../models/user.interface';

@Injectable({ providedIn: 'root' })
export class UserService implements OnDestroy {
  private currentUsernameSubject = new BehaviorSubject<string | null>(null);
  currentUsername$ = this.currentUsernameSubject.asObservable();
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  private subscription = new Subscription();

  constructor(private db: Firestore, private snackBar: MatSnackBar) {
    this.currentUsernameSubject.next(localStorage.getItem('username'));
    this.subscription.add(
      this.currentUsername$.subscribe((username) => {
        if (username) {
          const docRef = doc(db, 'users', username);
          getDoc(docRef).then((docSnapshot) => {
            if (docSnapshot.exists()) {
              this.currentUserSubject.next(docSnapshot.data() as User);
            } else {
              setDoc(docRef, {
                username,
                canBoost: true,
                addedTimestamp: serverTimestamp(),
              });
            }
          });
        }
      })
    );
  }

  async register(username: string) {
    try {
      const docRef = doc(this.db, 'users', username);
      await setDoc(docRef, {
        username,
        canBoost: true,
        addedTimestamp: serverTimestamp(),
      });
      localStorage.setItem('username', username);
      this.currentUsernameSubject.next(username);
      this.snackBar.open('Username saved', 'OK', {
        duration: 5000,
        verticalPosition: 'top',
      });
    } catch (error) {
      this.snackBar.open(error.message, 'OK', {
        duration: 5000,
        verticalPosition: 'top',
      });
      console.error(error);
    }
  }

  async update(oldUsername: string, newUsername: string) {
    try {
      const docRef = doc(this.db, 'users', oldUsername);
      await deleteDoc(docRef);
      await this.register(newUsername);
    } catch (error) {
      this.snackBar.open(error.message, 'OK', {
        duration: 5000,
        verticalPosition: 'top',
      });
      console.error(error);
    }
  }

  async updateCanBoost(user: User) {
    try {
      const docRef = doc(this.db, 'users', user.username);
      await updateDoc(docRef, { canBoost: !user.canBoost });
      this.currentUserSubject.next({ ...user, canBoost: !user.canBoost });
    } catch (error) {
      this.snackBar.open(error.message, 'OK', {
        duration: 5000,
        verticalPosition: 'top',
      });
      console.error(error);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
