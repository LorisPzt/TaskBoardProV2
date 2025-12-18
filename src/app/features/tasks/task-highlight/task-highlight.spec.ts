import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskHighlight } from './task-highlight';

describe('TaskHighlight', () => {
  let component: TaskHighlight;
  let fixture: ComponentFixture<TaskHighlight>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskHighlight]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskHighlight);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
