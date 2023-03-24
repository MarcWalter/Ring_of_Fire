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
  pickCardAnimation = false;
  turnCard = false;
  cardTurned = false;
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
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.turnAnimation();
      this.resetAnimation();
      this.changePlayer();
    }
  }

  turnAnimation() {
    this.pickCardAnimation = true;
    setTimeout(() => {
      this.turnCard = true
    }, 500);
    setTimeout(() => {
      this.cardTurned = true;
    }, 1000);
  }

  resetAnimation() {
    setTimeout(() => {
      this.pickCardAnimation = false;
      this.turnCard = false;
      this.cardTurned = false;
      this.game.playedCards.push(this.currentCard);
    }, 3000);
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
