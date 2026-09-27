import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  noX = 125;
  noY = 75;

  message = "Don't overthink it ;)";

  noAttempts = 0;

  constructor(private router: Router) {}

  sayYes(): void {
    this.router.navigate(['/plan']);
  }

  sayMaybe(): void {
    this.router.navigate(['/plan']);
  }

  moveNoButton(): void {
    this.noAttempts++;

    const messages = [
      'Nice try 😂',
      'Nope. Too slow 😌',
      'You really thought that would work? 😂',
      'The button has other plans 👀',
      'Okay, stop trying 😭'
    ];

    const index = Math.min(
      this.noAttempts - 1,
      messages.length - 1
    );

    this.message = messages[index];

    /*
     * Move the No button around the button area.
     * Keep it within reasonable boundaries.
     */
    const positions = [
      { x: 120, y: 75 },
      { x: -120, y: 75 },
      { x: 160, y: 20 },
      { x: -150, y: 20 },
      { x: 80, y: 115 },
      { x: -80, y: 115 },
      { x: 180, y: 90 },
      { x: -180, y: 90 }
    ];

    const position =
      positions[
        Math.floor(Math.random() * positions.length)
      ];

    this.noX = position.x;
    this.noY = position.y;
  }
}