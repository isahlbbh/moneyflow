const months = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

export function formatDate(dateString) {
  if (!dateString.includes("-")) {
    return dateString;
  }

  const parts = dateString.split("-");
  const monthIndex = Number(parts[1]) - 1;

  return `${Number(parts[2])} ${months[monthIndex]}`;
}