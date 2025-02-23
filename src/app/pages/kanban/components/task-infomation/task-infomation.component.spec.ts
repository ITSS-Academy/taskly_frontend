import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskInfomationComponent } from './task-infomation.component';

describe('TaskInfomationComponent', () => {
  let component: TaskInfomationComponent;
  let fixture: ComponentFixture<TaskInfomationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskInfomationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskInfomationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
