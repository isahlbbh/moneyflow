import { useState } from "react";
import { categories } from "../data/categories";

function TransactionForm({ onAdd }) {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Alimentação");

  function handleAdd() {
    if (description.trim() === "" || value.trim() === "") return;
    onAdd(description, value, type, category);
    setDescription("");
    setValue("");
  }

  return (
    <div className="form">
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
      <button className="add-btn" onClick={handleAdd}>
        Adicionar transação
      </button>
    </div>
  );
}

export default TransactionForm;
