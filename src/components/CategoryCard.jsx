import Icon from "./Icon";

function CategoryCard({ name, value, color, icon }) {
  return (
    <div className="cat" style={{ background: color }}>
      <div className="cat-icon">
        <Icon d={icon} />
      </div>
      <div className="cat-value">{value}</div>
      <div className="cat-name">{name}</div>
    </div>
  );
}

export default CategoryCard;
