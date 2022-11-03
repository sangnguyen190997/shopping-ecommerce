import React from "react";

export default function Sort({ handleSort }) {
  const changeValue = (e) => {
    const value = e.target.value;
    handleSort(value);
  };
  return (
    <select className="selectpicker ml-auto" onChange={changeValue}>
      <option value="default">Default sorting</option>
      <option value="DownToUp">Price: Low to High</option>
      <option value="UpToDown">Price: High to Low</option>
    </select>
  );
}
