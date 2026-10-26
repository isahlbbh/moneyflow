import { useState } from "react";
import { categories } from "../data/categories";
import { parseMoney } from "../utils/money";

function TransactionForm({ onAdd }) {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Alimentação");
  const [error, setError] = useState("");

  function handleAdd(event) {
    event.preventDefault();
    if (description.trim() === "" || value.trim() === "") {
      setError("Preencha a descrição e o valor.");
      return;
    }

    const number = parseMoney(value);
    if (Number.isNaN(number) || number <= 0) {
      setError("Digite um valor válido, como 45,90.");
      return;
    }

    onAdd(description, value, type, category);
    setDescription("");
    setValue("");
    setError("");
  }

  return (
    <form className="form" onSubmit={handleAdd}>
      <h2>Nova transação</h2>
      <label className="field">
        Descrição
        <input
          type="text"
          placeholder="Ex.: Mercado"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </label>
      <label className="field">
        Valor (R$)
        <input
          type="text"
          inputMode="decimal"
          placeholder="0,00"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </label>
      <label className="field">
        Tipo
        <select value={type} onChange={(event) => setType(event.target.value)}>
          <option value="expense">Despesa</option>
          <option value="income">Entrada</option>
        </select>
      </label>
      <label className="field">
        Categoria
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {Object.keys(categories).map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </label>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <button className="add-btn">Adicionar transação</button>
    </form>
  );
}

export default TransactionForm;
