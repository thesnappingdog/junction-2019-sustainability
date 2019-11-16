import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-intro-card',
  templateUrl: './intro-card.component.html',
  styleUrls: ['./intro-card.component.scss']
})
export class IntroCardComponent {

  @Input() imageUrl: string;
  @Input() title: string;
  
  constructor(
  ) { }
}
