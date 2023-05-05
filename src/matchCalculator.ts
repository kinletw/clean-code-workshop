import { Game, Match } from "./types";

export class MatchCalculator {
  protected match: Match;
  protected game: Game;

  constructor(match: Match, game: Game) {
    this.match = match;
    this.game = game;
  }

  get amount(): number {
    throw new Error("Subclass Responsibility");
  }

  public get gameCredits(): number {
    return Math.max(this.match.players - 30, 0);
  }
}

export class ShooterMatchCalculator extends MatchCalculator {
  get amount() {
    let result = 400;
    if (this.match.players > 30) {
      result += 10 * (this.match.players - 30);
    }
    return result;
  }
}

export class RacingMatchCalculator extends MatchCalculator {
  get amount() {
    let result = 300;
    if (this.match.players > 20) {
      result += 100 + 5 * (this.match.players - 20);
    }
    result += 3 * this.match.players;
    return result;
  }

  get gameCredits() {
    // @ts-ignore
    return super.gameCredits + Math.floor(this.match.players / 10);
  }
}

export class UnknownMatchCalculator extends MatchCalculator {
  get amount(): number {
    throw new Error(`Unknown type: ${this.game?.type}`);
  }
}

export class HorrorMatchCalculator extends MatchCalculator {
  private readonly costPerPlayer = 200;

  get amount() {
    return this.match.players * this.costPerPlayer;
  }

  private readonly creditsPer4Players = 5;

  get gameCredits() {
    return (
      // @ts-ignore
      super.gameCredits + this.noOf4Players * this.creditsPer4Players
    );
  }

  private get noOf4Players() {
    return Math.floor(this.match.players / 4);
  }
}
