import React from 'react'

class SearchBar extends React.Component {


    render() {
        return(
            <div>
                <h2>Search for Food donations by Company Name or Date!</h2>
                 <input type="date" name="searchDate" placeholder="Search" value={this.props.searchDate} onChange={this.props.inputChange}/>
                 <input type="text" name="searchCompany" placeholder="Search" value={this.props.searchCompany} onChange={this.props.inputChange}/>
            </div> 
            )
    }
}

export default SearchBar;