import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  noX = 0;
  noY = 0;

  message = "Don't overthink it ;)";

  noAttempts = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  sayYes(): void {
    this.router.navigate(['/plan'], { queryParamsHandling: 'preserve' });
  }

  sayMaybe(): void {
    this.router.navigate(['/plan'], { queryParamsHandling: 'preserve' });
  }

  moveNoButton(buttonArea: HTMLElement, button: HTMLButtonElement): void {
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

    const maxX = Math.max(
      0,
      (buttonArea.clientWidth - button.offsetWidth) / 2 - 8
    );
    const maxY = Math.max(
      0,
      buttonArea.clientHeight - 128 - button.offsetHeight - 8
    );

    const positions = [
      { x: -maxX, y: 0 },
      { x: maxX, y: 0 },
      { x: -maxX, y: maxY },
      { x: maxX, y: maxY },
      { x: 0, y: maxY },
      { x: -maxX / 2, y: maxY / 2 },
      { x: maxX / 2, y: maxY / 2 },
      { x: 0, y: maxY / 2 }
    ];

    const position =
      positions[
        Math.floor(Math.random() * positions.length)
      ];

    this.noX = position.x;
    this.noY = position.y;
  }
}