import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistAddDialogComponent } from './playlist-add-dialog.component';

describe('PlaylistAddDialogComponent', () => {
  let component: PlaylistAddDialogComponent;
  let fixture: ComponentFixture<PlaylistAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
