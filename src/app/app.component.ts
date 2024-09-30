import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardService } from './cards.service';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, CardModule],
  providers: [CardService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Teste';
  cards: any[] = [];
  shuffledCards: any[] = [];
  shownCards: any[] = [];
  historyCards: any[] = [];
  currentCardIndex: number = 0;
  gameFinished: boolean = false;

  constructor(private cardService: CardService) {}

  ngOnInit() {
    this.loadCards();
  }

  loadCards() {
    this.cardService.getCards().subscribe((data: any) => {
      this.cards = data;
    });
  }

  startNewGame() {
    this.shownCards = [];
    this.historyCards = [];
    this.currentCardIndex = 0;
    this.shuffledCards = this.shuffleArray([...this.cards]);
    this.gameFinished = false;
    this.showNextCard();
  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  showNextCard() {
    if (this.currentCardIndex < this.shuffledCards.length) {
      const nextCard = this.shuffledCards[this.currentCardIndex];
      this.shownCards = [nextCard];
      this.historyCards.push(nextCard);
      this.currentCardIndex++;
    } else {
      this.gameFinished = true;
    }
  }

  showPrevCard() {
    if (this.currentCardIndex > 1) {
      this.currentCardIndex--;
      const prevCard = this.historyCards[this.currentCardIndex - 1];
      this.shownCards = [prevCard];
    }
  }
}
