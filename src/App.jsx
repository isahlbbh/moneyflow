import { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import BalanceCard from "./components/BalanceCard";
import CategoryCard from "./components/CategoryCard";
import TransactionItem from "./components/TransactionItem";
import { categories } from "./data/categories";
import TransactionForm from "./components/TransactionForm";
import { parseMoney, formatMoney } from "./utils/money";
import { formatMonth } from "./utils/date";

const initialTransactions = [
  {
    id: 1,
    name: "Cinema",
    date: "2026-10-17",
    category: "Lazer",
    amount: 89.9,
    type: "expense",
  },
  {
    id: 2,
    name: "Farmácia",
    date: "2026-10-16",
    category: "Saúde",
    amount: 93.5,
    type: "expense",
  },
  {
    id: 3,
    name: "Internet",
    date: "2026-10-16",
    category: "Moradia",
    amount: 99.9,
    type: "expense",
  },
  {
    id: 4,
    name: "Restaurante",
    date: "2026-10-15",
    category: "Alimentação",
    amount: 215.2,
    type: "expense",
  },
  {
    id: 5,
    name: "Uber",
    date: "2026-10-14",
    category: "Transporte",
    amount: 148.6,
    type: "expense",
  },
  {
    id: 6,
    name: "Freelance site",
    date: "2026-10-12",
    category: "Renda",
    amount: 700,
    type: "income",
  },
  {
    id: 7,
    name: "Aluguel",
    date: "2026-10-10",
    category: "Moradia",
    amount: 1100,
    type: "expense",
  },
  {
    id: 8,
    name: "Mercado",
    date: "2026-10-08",
    category: "Alimentação",
    amount: 612.4,
    type: "expense",
  },
  {
    id: 9,
    name: "Salário",
    date: "2026-10-05",
    category: "Renda",
    amount: 4500,
    type: "income",
  },
];

function App() {
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem("moneyflow-transactions");
      return saved ? JSON.parse(saved) : initialTransactions;
    } catch (error) {
      return initialTransactions;
    }
  });

  const [selectedMonth, setSelectedMonth] = useState("all");

  useEffect(() => {
    localStorage.setItem(
      "moneyflow-transactions",
      JSON.stringify(transactions),
    );
  }, [transactions]);

  function addTransaction(name, value, type, category, date) {
    const number = parseMoney(value);
    if (Number.isNaN(number) || number <= 0) return;

    const newTransaction = {
      id: Date.now(),
      name: name,
      date: date,
      category: category,
      amount: number,
      type: type,
    };
    setTransactions([newTransaction, ...transactions]);
  }

  function deleteTransaction(id) {
    setTransactions(transactions.filter((t) => t.id !== id));
  }

  const visibleTransactions = transactions.filter(
    (t) => selectedMonth === "all" || t.date.startsWith(selectedMonth),
  );

  const income = visibleTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = visibleTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  const availableMonths = [
    ...new Set(transactions.map((t) => t.date.slice(0, 7))),
  ].sort();

  const expenseCategories = Object.keys(categories).filter(
    (name) => name !== "Renda",
  );

  return (
    <div className="shell">
      <Sidebar />
      <main className="main">
        <header className="topbar">
          <h1>Visão geral</h1>
          <span className="month">
            {selectedMonth === "all"
              ? "Todos os meses"
              : formatMonth(selectedMonth)}
          </span>
        </header>
        <BalanceCard income={income} expense={expense} balance={balance} />
        <div className="cats">
          {expenseCategories.map((name) => {
            const total = visibleTransactions
              .filter((t) => t.type === "expense" && t.category === name)
              .reduce((sum, t) => sum + t.amount, 0);

            return (
              <CategoryCard
                key={name}
                name={name}
                value={formatMoney(total)}
                color={categories[name].color}
                icon={categories[name].icon}
              />
            );
          })}
        </div>
      </main>
      <section className="panel">
        <TransactionForm onAdd={addTransaction} />
        <h2>Últimas transações</h2>
        <select
          className="month-filter"
          value={selectedMonth}
          onChange={(event) => setSelectedMonth(event.target.value)}
        >
          <option value="all">Todos os meses</option>
          {availableMonths.map((month) => (
            <option key={month} value={month}>
              {formatMonth(month)}
            </option>
          ))}
        </select>
        <div>
          {visibleTransactions.map((t) => {
            const info = categories[t.category];
            return (
              <TransactionItem
                key={t.id}
                id={t.id}
                name={t.name}
                date={t.date}
                category={t.category}
                amount={t.amount}
                type={t.type}
                color={info.color}
                icon={info.icon}
                onDelete={deleteTransaction}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default App;
