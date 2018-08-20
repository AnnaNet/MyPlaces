import React, {Component} from 'react';
import Search from './Search'

class ListPlaces extends Component {
  render() {
    return (
      <div className='list-places box'>
        <div>
          Search
          <Search/>
          <button>Go!</button>
        </div>
        <ul>
          {this.props.markers.map((item) => (
            <li className='list' key={item.title}>
              <div>{item.title}</div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default ListPlaces
