import React, { useState } from "react";

export default function filter({ isChecked, color,handleSelect }) {
  return (
    <>
      {isChecked ? (
        <i className="fas fa-check-circle" style={{color:color.colorValue}} onClick={()=>handleSelect("color",color.colorId)} title={color.colorName}></i>
      ) : (
        <i className="fas fa-circle" style={{color:color.colorValue}} onClick={()=>handleSelect("color",color.colorId)} title={color.colorName}></i>
      )}
    </>
  );
}
