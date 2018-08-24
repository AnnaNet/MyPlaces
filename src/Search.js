import React, {Component} from 'react';
import SearchInput, {createFilter} from 'react-search-input'

let indx = 6;

class Search extends Component {

  render() {

    return (
      <div className='list-places box'>
        <div className='search' tabIndex='3'>
          Enter place:
          <SearchInput className='input' tabIndex='4' role='searchInput' onChange={this.props.search}/>
        </div>
        <ul className='list' tabIndex='5' role='ListPlaces'>
          {this.props.results.map((item) => (
            <li tabIndex={indx++} role='itemOfListPlaces' onClick={(event) => {this.props.animaMarker(event.target.innerHTML)}} className='listElement' id='list' key={item.title}>
              {item.title}
            </li>
          ))}
          <div role='MessageNoResaltsOfSearch' label='Sorry, no results, try again!'>
            {this.props.empty}
          </div>
        </ul>
      </div>
    )
  }
}

export default Search
