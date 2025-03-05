import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelDialogComponent } from './label-dialog.component';

describe('LabelDialogComponent', () => {
  let component: LabelDialogComponent;
  let fixture: ComponentFixture<LabelDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabelDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
