import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.css']
})
export class CompleteComponent {
  answers: any = {};

  submitted = false;
  submitting = false;
  error = false;

  // EmailJS configuration
  private readonly SERVICE_ID = 'service_q39122s';
  private readonly TEMPLATE_ID = 'template_m1d3yju';
  private readonly PUBLIC_KEY = 'SGJ5vKrcu0WYP6N4H';

  readonly participantName: string;

  constructor(private route: ActivatedRoute) {
    this.participantName = (
      this.route.snapshot.queryParamMap.get('name') || ''
    ).trim().slice(0, 100);

    const savedAnswers = sessionStorage.getItem('dateAnswers');

    if (savedAnswers) {
      this.answers = JSON.parse(savedAnswers);
    }

  }

  selectAnswer(answer: string): void {

    this.answers.meet = answer;

    sessionStorage.setItem(
      'dateAnswers',
      JSON.stringify(this.answers)
    );

  }

  submit(): void {

    // Don't submit without answering the final question
    if (!this.answers.meet) {
      return;
    }

    this.submitting = true;
    this.error = false;

    const templateParams = {

      name: this.participantName || 'Unknown',

      day: this.answers.day || 'Not specified',

      time: this.answers.time || 'Not specified',

      activity: this.answers.activity || 'Not specified',

      food: this.answers.food || 'Not specified',

      location: this.answers.location || 'Not specified',

      note: this.answers.note || 'Nothing extra',

      meet: this.answers.meet || 'Not specified'

    };

    emailjs
      .send(
        this.SERVICE_ID,
        this.TEMPLATE_ID,
        templateParams,
        {
          publicKey: this.PUBLIC_KEY
        }
      )
      .then((response) => {

        console.log(
          'Email sent successfully:',
          response.status,
          response.text
        );

        this.submitting = false;
        this.submitted = true;

        // Remove the saved answers after successful submission
        sessionStorage.removeItem('dateAnswers');

      })
      .catch((error: unknown) => {

        console.error(
          'Failed to send email:',
          error
        );

        this.submitting = false;
        this.error = true;

      });

  }

}