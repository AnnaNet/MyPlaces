import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    markers: [],
  }

  constructor(props) {
    super(props);
    this.mapElement = React.createRef();
  }

  bindMap = () => {
    const getKey = document.createElement('script');
    getKey.type = 'text/javascript';
    getKey.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyApp0dmkFOzhnyURzMZy_KeE27h9_6e5Uw";
    getKey.async = true;

    const getMap = new Promise((resolve, reject) => {
      document.head.appendChild(getKey);
      console.log (getKey);
      getKey.onload = resolve;
      getKey.onerror = reject;

    }).then(() => {
      setTimeout (() => {
        let map = new google.maps.Map(this.mapElement, {
          zoom: 15,
          center: {lat: 59.928395, lng: 30.239069},
      })}, 5000);

    }).catch(error => {
      console.error(`Can't load map: ${error}`);
    });
  }

  componentDidMount() {
    this.bindMap();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">WELCOME to MY PLACES!</h1>
        </header>
        <div ref={this.mapElement}/>
      </div>
    );
  }
}

export default App;
