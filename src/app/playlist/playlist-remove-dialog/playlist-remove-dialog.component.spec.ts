import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistRemoveDialogComponent } from './playlist-remove-dialog.component';

describe('PlaylistRemoveDialogComponent', () => {
  let component: PlaylistRemoveDialogComponent;
  let fixture: ComponentFixture<PlaylistRemoveDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistRemoveDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistRemoveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
