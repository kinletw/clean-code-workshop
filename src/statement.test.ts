import { htmlStatement, renderHtmlStatement, statement } from "./statement";
import games from "./data/games";

describe("Statement Characterisation tests", () => {
  it("should run statement for invoice", () => {
    expect(
      statement(
        {
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
        },
        games
      )
    ).toStrictEqual(
      "Statement for test\n" +
        " Counter Strike: Global Offense: $4.00 (10 players)\n" +
        " Need For Speed: Unbound: $3.30 (10 players)\n" +
        " Counter Strike: Global Offense: $5.00 (40 players)\n" +
        " Need For Speed: Unbound: $6.20 (40 players)\n" +
        "Amount owed is $18.50\n" +
        "You earned 25 credits\n"
    );
  });

  it("should run html statement for invoice", () => {
    expect(
      htmlStatement(
        {
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
        },
        games
      )
    ).toStrictEqual(
      "<h1>Statement for <b>test</b></h1>" +
        "<table>" +
        "<thead><tr><th>Game</th><th>Players</th><th>Cost</th></tr></thead>" +
        "<tbody>" +
        "<tr><td>Counter Strike: Global Offense</td><td>10</td><td>$4.00</td><tr><td>Need For Speed: Unbound</td><td>10</td><td>$3.30</td><tr><td>Counter Strike: Global Offense</td><td>40</td><td>$5.00</td><tr><td>Need For Speed: Unbound</td><td>40</td><td>$6.20</td></tbody></table><p>Amount owed is <em>$18.50</em></p<p>You earned <em>25</em> credits</p>"
    );
  });
});

describe("Html Statement test", () => {
  it("should render Html statement", () => {
    expect(
      renderHtmlStatement({
        customer: "Test",
        matches: [
          {
            players: 10,
            gameID: "csgo",
            amount: 50,
            game: games["csgo"],
            gameCredits: 5,
          },
        ],
        totalAmount: 20,
        totalGameCredits: 30,
      })
    ).toStrictEqual(
      "<h1>Statement for <b>Test</b></h1>" +
        "<table><thead><tr><th>Game</th><th>Players</th><th>Cost</th></tr></thead>" +
        "<tbody><tr><td>Counter Strike: Global Offense</td><td>10</td><td>$0.50</td></tbody></table>" +
        "<p>Amount owed is <em>$0.20</em></p<p>You earned <em>30</em> credits</p>"
    );
  });
});
