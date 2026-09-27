import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import emailjs from '@emailjs/browser';

import { CompleteComponent } from './complete.component';

describe('CompleteComponent', () => {
  let component: CompleteComponent;
  let fixture: ComponentFixture<CompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompleteComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { queryParamMap: convertToParamMap({ name: 'Priya' }) } }
        }
      ]
    });
    fixture = TestBed.createComponent(CompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.participantName).toBe('Priya');
  });

  it('includes the participant name in the email template parameters', async () => {
    const sendSpy = spyOn(emailjs, 'send').and.returnValue(
      Promise.resolve({ status: 200, text: 'OK' })
    );
    component.answers.meet = 'Yes ❤️';

    component.submit();
    await Promise.resolve();

    expect(sendSpy).toHaveBeenCalledWith(
      'service_q39122s',
      'template_m1d3yju',
      jasmine.objectContaining({ name: 'Priya' }),
      { publicKey: 'SGJ5vKrcu0WYP6N4H' }
    );
  });
});
