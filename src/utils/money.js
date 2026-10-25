export function formatMoney(number) {
  return number.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function parseMoney(text) {
  return Number(text.replaceAll(".", "").replace(",", "."));
}