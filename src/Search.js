import React, {Component} from 'react';
import SearchInput, {createFilter} from 'react-search-input'

const key = 'title';

class Search extends Component {

  constructor (props) {
    super(props)

    this.state = {
      filter: ''
    }

    this.search = this.search.bind(this);
  }

  search = (newFilter) => {
    this.setState({
      filter: newFilter
    });
  }

  render() {
    const results = this.props.markers.filter(createFilter(this.state.filter, key))
    {this.props.newList(results)}
    return (
      <div className='list-places box'>
        <div>
          Search
          <SearchInput onChange={this.search}/>
        </div>
        <ul>
          {results.map((item) => (
            <li onClick={(event) => {this.props.animaMarker(event.target.innerHTML)}} className='list' id='list' key={item.title}>
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Search
