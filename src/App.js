import React, { Component } from 'react';
import './App.css';
import './responsive.css'
import Search from './Search'

class App extends Component {
  state = {
    markers: [
      {position: {lat: 59.928571, lng: 30.238909},
       title:'Opochinenskiy sadik'},
      {position: {lat: 59.9276493, lng: 30.2458688},
       title: 'Khram'},
      {position: {lat: 59.9324, lng: 30.251},
       title: 'Museum'},
      {position: {lat: 59.932897, lng: 30.2329588},
       title: 'Mounument torpedo boats'},
      {position: {lat: 59.9319183, lng: 30.2341878},
       title: 'Lenexpo'},
      {position: {lat: 59.9312105, lng: 30.253438},
       title: 'Hospital'},
    ],
  }

  bindMap = (markers) => {

    new Promise((resolve, reject) => {
        const getKey = document.createElement('script');
        getKey.type = 'text/javascript';
        getKey.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyApp0dmkFOzhnyURzMZy_KeE27h9_6e5Uw";
        getKey.async = true;
        getKey.onload = resolve;
        getKey.onerror = reject;
        document.head.appendChild(getKey);

    }).then(() => {
        this.map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: 59.928395, lng: 30.239069},
          zoom: 14,
        });
        markers.map((item) => {
          const marker = new window.google.maps.Marker({
            position: item.position,
            map: this.map,
            title: item.title
          })
          marker.addListener('click', () => {
            this.info = new window.google.maps.InfoWindow({
              content: item.title,
            });
            this.info.open(this.map, marker);
          });

        });

    }).catch(error => {
      console.error(`Can't load map: ${error}`);
    });

  }

  componentDidMount() {
    this.bindMap(this.state.markers);
  }

  animaMarker = () => {
    console.log ('marker');
  }

  render() {
    return (
      <div className="App">
        <div className='container'>
          <header className="App-header box">
            <h1 className="App-title">WELCOME to MY PLACES!</h1>
          </header>
          <Search markers={this.state.markers} newList={this.bindMap} animaMarker={this.animaMarker}/>
          <div className="map" id='map'/>
        </div>
      </div>
    );
  }
}

export default App;
