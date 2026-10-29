import { formatMoney } from "../utils/money";

function ExpenseChart({ data }) {
  const max = Math.max(...data.map((item) => item.total), 1);

  return (
    <div className="chart">
      <h2>Gastos por categoria</h2>
      {data.map((item) => (
        <div className="chart-row" key={item.name}>
          <span className="chart-label">{item.name}</span>
          <div className="chart-track">
            <div
              className="chart-bar"
              style={{
                width: `${(item.total / max) * 100}%`,
                background: item.color,
              }}
            />
          </div>
          <span className="chart-value">{formatMoney(item.total)}</span>
        </div>
      ))}
    </div>
  );
}

export default ExpenseChart;
