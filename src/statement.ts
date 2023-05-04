import { Games, Invoice } from "./types";
import { createStatementData, StatementData } from "./createStatementData";

export function statement(invoice: Invoice, games: Games) {
  return renderPlainText(createStatementData(invoice, games));
}

function renderPlainText(data: StatementData) {
  let result = `Statement for ${data.customer}\n`;
  for (const match of data.matches) {
    result += ` ${match.game.name}: ${usdFor(match.amount)} (${
      match.players
    } players)\n`;
  }

  result += `Amount owed is ${usdFor(data.totalAmount)}\n`;
  result += `You earned ${data.totalGameCredits} credits\n`;
  return result;
}

export function htmlStatement(invoice: Invoice, games: Games) {
  return renderHtmlStatement(createStatementData(invoice, games));
}

export function renderHtmlStatement(data: StatementData) {
  let result = `<h1>Statement for <b>${data.customer}</b></h1>`;
  result +=
    "<table>" +
    "<thead><tr><th>Game</th><th>Players</th><th>Cost</th></tr></thead>" +
    "<tbody>";
  for (const match of data.matches) {
    result += `<tr><td>${match.game.name}</td><td>${
      match.players
    }</td><td>${usdFor(match.amount)}</td>`;
  }
  result += "</tbody></table>";

  result += `<p>Amount owed is <em>${usdFor(data.totalAmount)}</em></p`;
  result += `<p>You earned <em>${data.totalGameCredits}</em> credits</p>`;
  return result;
}

function usdFor(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(price / 100);
}
