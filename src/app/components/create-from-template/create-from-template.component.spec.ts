import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFromTemplateComponent } from './create-from-template.component';

describe('CreateFromTemplateComponent', () => {
  let component: CreateFromTemplateComponent;
  let fixture: ComponentFixture<CreateFromTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateFromTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFromTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
