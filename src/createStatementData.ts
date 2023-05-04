/**
 * Long method => responsibility > 1
 * Magic numbers
 * Nested If
 * Comments
 * Bad Naming
 * Temp variables
 */
import { ExpandedMatch, Games, Invoice, Match } from "./types";

// Naming {context}{result}{adj}(params)

// Split Phase
// 2 Phases:
// 1. Calculating
// 2. Formatting

export type StatementData = {
  customer: string;
  matches: ExpandedMatch[];
  totalAmount: number;
  totalGameCredits: number;
};

export function createStatementData(invoice: Invoice, games: Games) {
  const statementData: StatementData = {} as StatementData;
  statementData.customer = invoice.customer;
  statementData.matches = invoice.matches.map(expandMatch);
  statementData.totalAmount = totalAmount(statementData.matches);
  statementData.totalGameCredits = totalGameCredits(statementData.matches);

  function expandMatch(match: Match) {
    const result = Object.assign({}, match) as ExpandedMatch;
    result.game = gameFor(result);
    result.amount = amountFor(result);
    result.gameCredits = gameCreditsFor(result);
    return result;

    function gameFor(match: Match) {
      return games[match.gameID];
    }

    function amountFor(match: ExpandedMatch) {
      let result = 0;
      switch (match.game.type) {
        case "shooter":
          result = 400;
          if (match.players > 30) {
            result += 10 * (match.players - 30);
          }
          break;
        case "racing":
          result = 300;
          if (match.players > 20) {
            result += 100 + 5 * (match.players - 20);
          }
          result += 3 * match.players;
          break;
        default:
          throw new Error(`Unknown type: ${match.game.type}`);
      }
      return result;
    }

    function gameCreditsFor(match: ExpandedMatch) {
      let gameCredits = Math.max(match.players - 30, 0);
      // add extra credit for every ten racing players
      if ("racing" == match.game.type)
        gameCredits += Math.floor(match.players / 10);
      return gameCredits;
    }
  }

  function totalGameCredits(matches: ExpandedMatch[]) {
    let gameCredits = 0;
    for (const match of matches) {
      gameCredits += match.gameCredits;
    }
    return gameCredits;
  }

  function totalAmount(matches: ExpandedMatch[]) {
    let totalAmount = 0;
    for (const match of matches) {
      totalAmount += match.amount;
    }
    return totalAmount;
  }

  return statementData;
}