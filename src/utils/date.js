const months = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

export function formatDate(dateString) {
  if (!dateString.includes("-")) {
    return dateString;
  }

  const parts = dateString.split("-");
  const monthIndex = Number(parts[1]) - 1;

  return `${Number(parts[2])} ${months[monthIndex]}`;
}

export function formatMonth(monthString) {
  const parts = monthString.split("-");
  const monthIndex = Number(parts[1]) - 1;

  return `${monthNames[monthIndex]} ${parts[0]}`;
}