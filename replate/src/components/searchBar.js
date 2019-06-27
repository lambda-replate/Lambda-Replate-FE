import React from "react";
import "../App.css";

class SearchBar extends React.Component {
  render() {
    return (
      <div className="search-bar-container">
        <h2>Search for Food Pickups by Company Name or Date!</h2>
        <input
          type="date"
          name="searchDate"
          placeholder="Search"
          value={this.props.searchDate}
          onChange={this.props.inputChange}
        />
        <input
          type="text"
          name="searchCompany"
          placeholder="Search"
          value={this.props.searchCompany}
          onChange={this.props.inputChange}
        />
      </div>
    );
  }
}

export default SearchBar;
