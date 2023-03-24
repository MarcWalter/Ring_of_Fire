import { Component } from '@angular/core';
import { OnInit } from "@angular/core";
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  animationIsRunning = false;
  pickCardAnimation = false;
  turnCard = false;
  cardTurned = false;
  discardCard = false;
  topCardVisible = true;
  currentCard: string = '';
  game: Game;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (!this.animationIsRunning) {
      this.currentCard = this.game.stack.pop();
      this.turnAnimation();
      this.resetAnimation();
      this.changePlayer();
    }
  }

  turnAnimation() {
    this.pickCardAnimation = true;
    this.  animationIsRunning = true;
    // Turn card
    setTimeout(() => {
      this.turnCard = true
    }, 100);
    // Replace card
    setTimeout(() => {
      this.cardTurned = true;
      this.pickCardAnimation = false;
      this.turnCard = false;
      this.topCardVisible = false;
    }, 1000);
    // Move Card to stack
    setTimeout(() => {
      this.discardCard = true;
      this.topCardVisible = true;
    }, 1100);
  }

  resetAnimation() {
    setTimeout(() => {
      this.cardTurned = false;
      this.discardCard = false;
      this.animationIsRunning = false;
      this.game.playedCards.push(this.currentCard);
    }, 1700);
  }

  changePlayer() {
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }
}
