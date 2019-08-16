import React from "react";

const ListGroup = ({
  items,
  nameProperty,
  idProperty,
  selectedItem,
  onItemSelect
}) => {
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          key={item[idProperty]}
          className={
            selectedItem === item ? "list-group-item active" : "list-group-item"
          }
          onClick={() => onItemSelect(item)}
        >
          {item[nameProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  nameProperty: "name",
  idProperty: "_id"
};

export default ListGroup;
