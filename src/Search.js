import React, {Component} from 'react';
import SearchInput, {createFilter} from 'react-search-input'

const key = 'title';
const error = 'ERROR';

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
  }

  render() {
   // const results = this.props.markers.filter(createFilter(this.state.filter, key));
  //  this.props.newList(results);
    //this.props.isEmpty(results);
    return (
      <div className='list-places box'>
        <div className='search'>
          Enter place:
          <SearchInput className='input' onChange={this.search}/>
        </div>
        <ul className='list'>
          {this.state.results.map((item) => (
            <li onClick={(event) => {this.props.animaMarker(event.target.innerHTML)}} className='listElement' id='list' key={item.title}>
              {item.title}
            </li>
          ))}
          {this.props.empty}
        </ul>
      </div>
    )
  }
}

export default Search
