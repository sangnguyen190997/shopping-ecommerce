import React, { useRef, useState } from "react";

export default function Search({ handleSearch }) {
  const [search, setSearch] = useState("");
  const debounceSearch = useRef(null);

  const onChangeText = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (handleSearch) {
      if (debounceSearch.current) {
        clearTimeout(debounceSearch.current);
      }
      debounceSearch.current = setTimeout(() => {
        handleSearch(value);
      }, 500);
    }
  };

  return (
    <div className="col-lg-4">
      <input
        className="form-control form-control-lg"
        type="text"
        placeholder="Enter Search Here!"
        onChange={onChangeText}
        value={search}
      />
    </div>
  );
}
