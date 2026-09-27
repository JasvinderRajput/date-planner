import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { queryParamMap: convertToParamMap({ name: 'Priya' }) } }
        }
      ]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('preserves the participant name when starting the plan', () => {
    component.sayYes();

    expect(TestBed.inject(Router).navigate).toHaveBeenCalledWith(
      ['/plan'],
      { queryParamsHandling: 'preserve' }
    );
  });

  it('starts the No button centered and keeps it inside the button area', () => {
    const buttonArea = fixture.nativeElement.querySelector(
      '.buttons-container'
    ) as HTMLElement;
    const noButton = fixture.nativeElement.querySelector(
      '.no-button'
    ) as HTMLButtonElement;

    expect(component.noX).toBe(0);
    expect(component.noY).toBe(0);

    component.moveNoButton(buttonArea, noButton);

    const maxX = (buttonArea.clientWidth - noButton.offsetWidth) / 2 - 8;
    const maxY = buttonArea.clientHeight - 128 - noButton.offsetHeight - 8;

    expect(Math.abs(component.noX)).toBeLessThanOrEqual(maxX);
    expect(component.noY).toBeGreaterThanOrEqual(0);
    expect(component.noY).toBeLessThanOrEqual(maxY);
  });
});
