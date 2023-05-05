import { createStatementData } from "./createStatementData";
import games from "./data/games";
import {
  RacingMatchCalculator,
  ShooterMatchCalculator,
} from "./matchCalculator";

const expectedData = {
  customer: "test",
  matches: [
    {
      amount: 400,
      game: {
        name: "Counter Strike: Global Offense",
        type: "shooter",
        matchCalculator: ShooterMatchCalculator,
      },
      gameCredits: 0,
      gameID: "csgo",
      players: 10,
    },
    {
      amount: 330,
      game: {
        name: "Need For Speed: Unbound",
        type: "racing",
        matchCalculator: RacingMatchCalculator,
      },
      gameCredits: 1,
      gameID: "nfs",
      players: 10,
    },
    {
      amount: 500,
      game: {
        name: "Counter Strike: Global Offense",
        type: "shooter",
        matchCalculator: ShooterMatchCalculator,
      },
      gameCredits: 10,
      gameID: "csgo",
      players: 40,
    },
    {
      amount: 620,
      game: {
        name: "Need For Speed: Unbound",
        type: "racing",
        matchCalculator: RacingMatchCalculator,
      },
      gameCredits: 14,
      gameID: "nfs",
      players: 40,
    },
  ],
  totalAmount: 1850,
  totalGameCredits: 25,
};
describe("Create Statement Data Characterisation test", () => {
  const invoice = {
    customer: "test",
    matches: [
      {
        players: 10,
        gameID: "csgo",
      },
      {
        players: 10,
        gameID: "nfs",
      },
      {
        players: 40,
        gameID: "csgo",
      },
      {
        players: 40,
        gameID: "nfs",
      },
    ],
  };
  it("should generate statement data", () => {
    expect(createStatementData(invoice, games)).toStrictEqual(expectedData);
  });
});
