import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';

import { PlannerComponent } from './planner.component';

describe('PlannerComponent', () => {
  let component: PlannerComponent;
  let fixture: ComponentFixture<PlannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlannerComponent],
      providers: [
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { queryParamMap: convertToParamMap({ name: 'Priya' }) } }
        }
      ]
    });
    fixture = TestBed.createComponent(PlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('preserves query parameters when continuing to the completion page', () => {
    component.goToComplete();

    expect(TestBed.inject(Router).navigate).toHaveBeenCalledWith(
      ['/complete'],
      { queryParamsHandling: 'preserve' }
    );
  });
});
