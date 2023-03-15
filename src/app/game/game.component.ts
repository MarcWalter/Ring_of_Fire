import { Component } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  pickCardAnimation = false;
  turnCard = false;
  cardTurned = false;
  takeCard() {
    this.pickCardAnimation = true;
    setTimeout(() => {
      this.turnCard = true
    }, 500);
    setTimeout(() => {
      this.cardTurned = true;
    }, 600);
  }
}
