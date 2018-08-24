import React, {Component} from 'react';
import SearchInput, {createFilter} from 'react-search-input'

const key = 'title';
const error = 'ERROR';
let indx = 6;

class Search extends Component {

  constructor (props) {
    super(props)
    this.state = {
      filter: '',
      results: [],
    }
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    this.setState ({
      results: this.props.markers,
    })
  }

  search = (newFilter) => {
    this.setState({
      filter: newFilter
    });

    this.setState({
      results: this.props.markers.filter(createFilter(this.state.filter, key))
    })

    this.props.newList(this.state.results);

    this.props.isEmpty(this.state.results);

    this.props.clearFS();
  }

  render() {

    return (
      <div className='list-places box'>
        <div className='search' tabIndex='3'>
          Enter place:
          <SearchInput className='input' tabIndex='4' role='searchFild' onChange={this.search}/>
        </div>
        <ul className='list' tabIndex='5' role='ListPlaces'>
          {this.state.results.map((item) => (
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
