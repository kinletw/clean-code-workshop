/**
 * Long method => responsibility > 1
 * Magic numbers
 * Nested If
 * Comments
 * Bad Naming
 * Temp variables
 */
import { ExpandedMatch, Games, Invoice, Match } from "./types";
import { MatchCalculator } from "./matchCalculator";

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
    let matchCalculator: MatchCalculator = createMatchCalculator(match);
    const result = Object.assign({}, match) as ExpandedMatch;
    result.game = gameFor(result);
    result.amount = matchCalculator.amount;
    result.gameCredits = matchCalculator.gameCredits;
    return result;

    function createMatchCalculator(match: Match): MatchCalculator {
      const GameMatchCalculator = gameFor(match).matchCalculator;
      return new GameMatchCalculator(match, gameFor(match));
    }
    function gameFor(match: Match) {
      return games[match.gameID];
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
