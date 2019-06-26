import React from 'react'

class SearchBar extends React.Component {


    render() {
        return(
            <div>
                 <input type="date" name="searchDate" placeholder="Search" value={this.props.searchDate} onChange={this.props.inputChange}/>
                 <input type="text" name="searchCompany" placeholder="Search" value={this.props.searchCompany} onChange={this.props.inputChange}/>
            </div> 
            )
    }
}

export default SearchBar;