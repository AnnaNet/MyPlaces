import React, {Component} from 'react';

class Search extends Component {

  render() {
    return (
        <input onChange={(event) => {this.search(event.target.value)}} type='text' placeholder='Enter name of place'/>
    )
  }
}

export default Search
