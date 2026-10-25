import { formatMoney } from "../utils/money";

function BalanceCard({ income, expense, balance }) {
  return (
    <div className="card">
      <h2>Saldo do mês</h2>
      <p className="balance">{formatMoney(balance)}</p>
      <div className="balance-row">
        <div>
          <span className="label">Entradas</span>
          <strong className="income">+{formatMoney(income)}</strong>
        </div>
        <div>
          <span className="label">Despesas</span>
          <strong className="expense">−{formatMoney(expense)}</strong>
        </div>
      </div>
    </div>
  );
}

export default BalanceCard;
