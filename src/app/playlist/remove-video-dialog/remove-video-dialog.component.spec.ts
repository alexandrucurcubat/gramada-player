import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveVideoDialogComponent } from './remove-video-dialog.component';

describe('RemoveVideoDialogComponent', () => {
  let component: RemoveVideoDialogComponent;
  let fixture: ComponentFixture<RemoveVideoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveVideoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveVideoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
