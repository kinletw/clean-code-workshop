import {
  HorrorMatchCalculator,
  MatchCalculator,
  RacingMatchCalculator,
  ShooterMatchCalculator,
  UnknownMatchCalculator,
} from "./matchCalculator";
import games from "./data/games";

describe("MatchCalculator tests", () => {
  const match = {
    players: 20,
    gameID: "csgo",
  };
  const matchCalculator = new MatchCalculator(match, games[match.gameID]);
  it("should throw error on amount", () => {
    expect(() => matchCalculator.amount).toThrowError(
      "Subclass Responsibility"
    );
  });

  it("should give game credits as 0 when players less than 30", () => {
    match.players = 10;
    expect(matchCalculator.gameCredits).toStrictEqual(0);
  });

  it("should give game credits as equal to additional player more than 30", () => {
    match.players = 40;
    expect(matchCalculator.gameCredits).toStrictEqual(10);
  });
});

describe("ShooterMatchCalculator tests", () => {
  const match = {
    players: 20,
    gameID: "csgo",
  };

  const matchCalculator = new ShooterMatchCalculator(
    match,
    games[match.gameID]
  );
  it("should calculate amount for shooter with less than 20 players", () => {
    match.players = 10;
    expect(matchCalculator.amount).toStrictEqual(400);
  });

  it("should calculate amount for shooter with greater than 20 players", () => {
    match.players = 40;
    expect(matchCalculator.amount).toStrictEqual(500);
  });

  it("should give game credits as 0 when players less than 30", () => {
    match.players = 20;
    expect(matchCalculator.gameCredits).toStrictEqual(0);
  });

  it("should give game credits as equal to additional player more than 30", () => {
    match.players = 40;
    expect(matchCalculator.gameCredits).toStrictEqual(10);
  });
});

describe("RacingMatchCalculator tests", () => {
  const match = {
    players: 10,
    gameID: "nfs",
  };

  const matchCalculator = new RacingMatchCalculator(match, games[match.gameID]);
  it("should calculate amount for racing with less than 20 players", () => {
    match.players = 10;
    expect(matchCalculator.amount).toStrictEqual(330);
  });

  it("should calculate amount for racing with greater than 20 players", () => {
    match.players = 40;
    expect(matchCalculator.amount).toStrictEqual(620);
  });

  it("should give game credits  when players less than 30", () => {
    match.players = 20;
    expect(matchCalculator.gameCredits).toStrictEqual(2);
  });

  it("should give game credits as equal to additional player more than 30", () => {
    match.players = 40;
    expect(matchCalculator.gameCredits).toStrictEqual(14);
  });
});

describe("UnknownMatchCalculator tests", () => {
  const match = {
    players: 20,
    gameID: "jj",
  };
  const matchCalculator = new UnknownMatchCalculator(
    match,
    games[match.gameID]
  );
  it("should throw error on amount", () => {
    expect(() => matchCalculator.amount).toThrowError();
  });

  it("should give game credits as 0 when players less than 30", () => {
    match.players = 10;
    expect(matchCalculator.gameCredits).toStrictEqual(0);
  });

  it("should give game credits as equal to additional player more than 30", () => {
    match.players = 40;
    expect(matchCalculator.gameCredits).toStrictEqual(10);
  });
});

describe("HorrorMatchCalculator tests", () => {
  const match = {
    players: 10,
    gameID: "revii",
  };

  const matchCalculator = new HorrorMatchCalculator(match, games[match.gameID]);
  it("should calculate amount for horror", () => {
    match.players = 10;
    expect(matchCalculator.amount).toStrictEqual(10 * 200);
  });

  it("should give game credits  when players less than 30", () => {
    match.players = 20;
    expect(matchCalculator.gameCredits).toStrictEqual(Math.floor(20 / 4) * 5);
  });

  it("should give game credits as equal to additional player more than 30", () => {
    match.players = 40;
    expect(matchCalculator.gameCredits).toStrictEqual(
      Math.floor(40 / 4) * 5 + 10
    );
  });
});
