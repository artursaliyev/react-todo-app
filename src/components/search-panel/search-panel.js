import React from "react";

import "./search-panel.css";

const SearchPanel = ({ onTermChange }) => {
  return (
    <input
      type="text"
      className="form-control search-input"
      placeholder="type to search"
      onChange={e => onTermChange(e.target.value)}
    />
  );
};

export default SearchPanel;
