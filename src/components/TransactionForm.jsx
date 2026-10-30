import { useState, useEffect } from "react";
import { categories } from "../data/categories";
import { parseMoney } from "../utils/money";

function TransactionForm({ onAdd, onSave, onCancel, editingTransaction }) {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Alimentação");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingTransaction) {
      setDescription(editingTransaction.name);
      setDate(editingTransaction.date);
      setValue(String(editingTransaction.amount).replace(".", ","));
      setType(editingTransaction.type);
      setCategory(editingTransaction.category);
      setError("");
    }
  }, [editingTransaction]);

  function handleAdd(event) {
    event.preventDefault();

    if (
      description.trim() === "" ||
      value.trim() === "" ||
      date.trim() === ""
    ) {
      setError("Preencha a descrição, o valor e a data.");
      return;
    }

    if (new Date(date) > new Date()) {
      setError("Digite uma data válida.");
      return;
    }

    const number = parseMoney(value);
    if (Number.isNaN(number) || number <= 0) {
      setError("Digite um valor válido, como 45,90.");
      return;
    }

    if (editingTransaction) {
      onSave(description, value, type, category, date);
    } else {
      onAdd(description, value, type, category, date);
    }
    setDescription("");
    setValue("");
    setDate("");
    setError("");
  }

  function handleCancel() {
    onCancel();
    setDescription("");
    setDate("");
    setValue("");
    setType("expense");
    setCategory("Alimentação");
    setError("");
  }

  return (
    <form className="form" onSubmit={handleAdd}>
      {/* NOVO: o título muda conforme o modo */}
      <h2>{editingTransaction ? "Editar transação" : "Nova transação"}</h2>
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
        Data
        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
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
      <button className="add-btn">
        {editingTransaction ? "Salvar alterações" : "Adicionar transação"}
      </button>
      {editingTransaction && (
        <button
          type="button"
          className="add-btn cancel-btn"
          onClick={handleCancel}
        >
          Cancelar
        </button>
      )}
    </form>
  );
}

export default TransactionForm;
