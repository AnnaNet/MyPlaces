import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    markers: [],
  }

 // constructor(props) {
 //   super(props);
 // }

  bindMap = () => {

    new Promise((resolve, reject) => {
      const getKey = document.createElement('script');
      getKey.type = 'text/javascript';
      getKey.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyApp0dmkFOzhnyURzMZy_KeE27h9_6e5Uw";
      getKey.defer = true;
      getKey.onload = resolve;
      getKey.onerror = reject;
      document.head.appendChild(getKey);
      console.log (getKey);

    }).then(() => {
        this.map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: 59.928395, lng: 30.239069},
          zoom: 15,
        });
        this.marker = new window.google.maps.Marker({
          position: {lat: 59.928571, lng: 30.238909},
          map: this.map,
          title:'Opochinenskiy sadik',
        });

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
        <div className="map" id='map'/>
      </div>
    );
  }
}

export default App;
