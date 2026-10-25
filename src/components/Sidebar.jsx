import Icon from "./Icon";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">M</div>
      <button className="nav-btn active" aria-label="Painel">
        <Icon d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />
      </button>
      <button className="nav-btn" aria-label="Transações">
        <Icon d="M3 7h18v12H3zM3 11h18M7 15h3" />
      </button>
      <button className="nav-btn" aria-label="Relatórios">
        <Icon d="M12 3v9h9a9 9 0 11-9-9z" />
      </button>
      <button className="nav-btn" aria-label="Categorias">
        <Icon d="M4 6h16M4 12h16M4 18h10" />
      </button>
    </aside>
  );
}

export default Sidebar;
