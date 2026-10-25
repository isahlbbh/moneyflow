import { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import BalanceCard from "./components/BalanceCard";
import CategoryCard from "./components/CategoryCard";
import TransactionItem from "./components/TransactionItem";
import { categories } from "./data/categories";
import TransactionForm from "./components/TransactionForm";
import { parseMoney, formatMoney } from "./utils/money";

const initialTransactions = [
  {
    id: 1,
    name: "Cinema",
    date: "17 out",
    category: "Lazer",
    amount: 89.9,
    type: "expense",
  },
  {
    id: 2,
    name: "Farmácia",
    date: "16 out",
    category: "Saúde",
    amount: 93.5,
    type: "expense",
  },
  {
    id: 3,
    name: "Internet",
    date: "16 out",
    category: "Moradia",
    amount: 99.9,
    type: "expense",
  },
  {
    id: 4,
    name: "Restaurante",
    date: "15 out",
    category: "Alimentação",
    amount: 215.2,
    type: "expense",
  },
  {
    id: 5,
    name: "Uber",
    date: "14 out",
    category: "Transporte",
    amount: 148.6,
    type: "expense",
  },
  {
    id: 6,
    name: "Freelance site",
    date: "12 out",
    category: "Renda",
    amount: 700,
    type: "income",
  },
  {
    id: 7,
    name: "Aluguel",
    date: "10 out",
    category: "Moradia",
    amount: 1100,
    type: "expense",
  },
  {
    id: 8,
    name: "Mercado",
    date: "08 out",
    category: "Alimentação",
    amount: 612.4,
    type: "expense",
  },
  {
    id: 9,
    name: "Salário",
    date: "05 out",
    category: "Renda",
    amount: 4500,
    type: "income",
  },
];

function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("moneyflow-transactions");
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  useEffect(() => {
    localStorage.setItem(
      "moneyflow-transactions",
      JSON.stringify(transactions),
    );
  }, [transactions]);

  function addTransaction(name, value, type, category) {
    const number = parseMoney(value);
    if (Number.isNaN(number) || number <= 0) return;

    const newTransaction = {
      id: Date.now(),
      name: name,
      date: "18 out",
      category: category,
      amount: number,
      type: type,
    };
    setTransactions([newTransaction, ...transactions]);
  }

  function deleteTransaction(id) {
    setTransactions(transactions.filter((t) => t.id !== id));
  }

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  const expenseCategories = Object.keys(categories).filter(
    (name) => name !== "Renda",
  );

  return (
    <div className="shell">
      <Sidebar />
      <main className="main">
        <header className="topbar">
          <h1>Visão geral</h1>
          <span className="month">Outubro 2026</span>
        </header>
        <BalanceCard income={income} expense={expense} balance={balance} />
        <div className="cats">
          {expenseCategories.map((name) => {
            const total = transactions
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
        <div>
          {transactions.map((t) => {
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
