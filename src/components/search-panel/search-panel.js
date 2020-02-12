import React from "react";

import "./search-panel.css";

const SearchPanel = ({ term, onTermChange }) => {
  return (
    <>
      <span>{term}</span>
      <input
        type="text"
        className="form-control search-input"
        placeholder="type to search"
        onChange={e => onTermChange(e.target.value)}
        value={term}
      />
    </>
  );
};

export default SearchPanel;
