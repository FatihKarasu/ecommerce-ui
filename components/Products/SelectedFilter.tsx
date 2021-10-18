import React from "react";

export default function SelectedFilter({ type, id, getValues, handleSelect }) {
  let filter = getValues(type,id);
  return (
    <>
      {type === "size" ? (
        <div className="filter" onClick={() => handleSelect(type, id)} title={`Remove ${filter.sizeName}`}>
          <div>{filter.sizeName.toUpperCase()}</div>
          <i className="fas fa-times"></i>
        </div>
      ) : null}

      {type === "color" ? (
        <div className="filter" onClick={() => handleSelect(type, id)} title={`Remove ${filter.colorName}`}>
          <i className="fas fa-times-circle" style={{color:filter.colorValue}} ></i>
        </div>
      ) : null}
    </>
  );
}
