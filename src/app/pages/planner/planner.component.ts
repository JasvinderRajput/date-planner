import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Option {
  label: string;
  emoji: string;
  value: string;
}

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent {

  currentStep = 0;

  answers = {
    day: '',
    time: '',
    activity: '',
    food: '',
    location: '',
    note: ''
  };

  days: Option[] = [
    {
      label: 'Friday',
      emoji: '🌙',
      value: 'Friday'
    },
    {
      label: 'Saturday',
      emoji: '✨',
      value: 'Saturday'
    },
    {
      label: 'Sunday',
      emoji: '☀️',
      value: 'Sunday'
    }
  ];

  times: Option[] = [
    {
      label: 'Afternoon',
      emoji: '🌤️',
      value: 'Afternoon'
    },
    {
      label: 'Evening',
      emoji: '🌆',
      value: 'Evening'
    },
    {
      label: 'Night',
      emoji: '🌙',
      value: 'Night'
    }
  ];

  activities: Option[] = [
    {
      label: 'Coffee & conversation',
      emoji: '☕',
      value: 'Coffee & conversation'
    },
    {
      label: 'Movie night',
      emoji: '🎬',
      value: 'Movie night'
    },
    {
      label: 'Sunset walk',
      emoji: '🌅',
      value: 'Sunset walk'
    },
    {
      label: 'Picnic date',
      emoji: '🧺',
      value: 'Picnic date'
    },
    {
      label: 'Something spontaneous',
      emoji: '✨',
      value: 'Something spontaneous'
    }
  ];

  foods: Option[] = [
    {
      label: 'Italian',
      emoji: '🍝',
      value: 'Italian'
    },
    {
      label: 'Japanese',
      emoji: '🍣',
      value: 'Japanese'
    },
    {
      label: 'Dessert / brunch',
      emoji: '🧁',
      value: 'Dessert / brunch'
    },
    {
      label: 'Cozy cafe',
      emoji: '☕',
      value: 'Cozy cafe'
    },
    {
      label: 'Anything works',
      emoji: '😌',
      value: 'Anything works'
    }
  ];

  locations: Option[] = [
    {
      label: 'Your favorite spot',
      emoji: '💖',
      value: 'Your favorite spot'
    },
    {
      label: 'I have a place',
      emoji: '📍',
      value: 'I have a place'
    },
    {
      label: "Let's decide together",
      emoji: '🤝',
      value: "Let's decide together"
    }
  ];

  constructor(private router: Router) {}

  selectOption(
    category: 'day' | 'time' | 'activity' | 'food' | 'location',
    value: string
  ): void {

    this.answers[category] = value;

    setTimeout(() => {
      this.nextStep();
    }, 200);
  }

  nextStep(): void {

    if (this.currentStep < 5) {
      this.currentStep++;
    } else {
      this.goToComplete();
    }
  }

  previousStep(): void {

    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  goToComplete(): void {

    sessionStorage.setItem(
      'dateAnswers',
      JSON.stringify(this.answers)
    );

    this.router.navigate(['/complete'], { queryParamsHandling: 'preserve' });
  }
}