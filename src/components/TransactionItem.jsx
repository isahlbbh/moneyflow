import Icon from "./Icon";
import { formatMoney } from "../utils/money";
import { formatDate } from "../utils/date";

function TransactionItem({
  id,
  name,
  date,
  category,
  amount,
  type,
  color,
  icon,
  onDelete,
}) {
  return (
    <div className="tx">
      <div className="tx-avatar" style={{ background: color }}>
        <Icon d={icon} />
      </div>
      <div className="tx-info">
        <div className="tx-name">{name}</div>
        <div className="tx-meta">
          {formatDate(date)} · {category}
        </div>
      </div>
      <div
        className={type === "income" ? "tx-amount income" : "tx-amount expense"}
      >
        {type === "income" ? "+" : "−"}
        {formatMoney(amount)}
      </div>
      <button
        className="tx-delete"
        aria-label={`Excluir ${name}`}
        onClick={() => onDelete(id)}
      >
        <Icon d="M5 7h14M10 7V4h4v3M7 7l1 13h8l1-13" />
      </button>
    </div>
  );
}

export default TransactionItem;
