import React from 'react';
import './App.css';
import './responsive.css';
import Search from './Search';

let foursquare = require('react-foursquare') ({
  clientID: 'KD1PWPYWK0TJ3EJI2FAXLV1TD4RPVOK2T04A1NHLPQDKHMBS',
  clientSecret: '5V0AMDA4VWTOWX4BK52F13DD3SVSZ1FE50HZX31MZFYPTII5',
});

let indxCafe = 21;
let indxMetro = 26;

class App extends React.Component {

  state = {
    seenMarkers: [],

    empty: '',

    paramsFS: [],
    paramsFS2: [],
    items: [],
    items2: [],
    cafe: '',
    metro: '',

    markers: [
      {position: {lat: 59.9339097, lng: 30.3064605},
       title: 'St. Isaac`s Cathedral'},
      {position: {lat: 59.9315767, lng: 30.4416422},
       title: 'Ladozhskiy vokzal'},
      {position: {lat: 59.9554007, lng: 30.337832},
       title: 'Cruiser Aurora'},
      {position: {lat: 59.9017147, lng: 30.2829393},
       title: 'Narva Gate'},
      {position: {lat: 59.9276493, lng: 30.2458688},
       title: 'Russian Museum'},
      {position: {lat: 59.932897, lng: 30.2329588},
       title: 'Mounument torpedo boats'},
      {position: {lat: 59.9256377, lng: 30.2959024},
       title: 'Mariinsky Theatre'},
      {position: {lat: 59.8692564, lng: 30.3419138},
       title: 'Peterburgskiy Sportivno-Kontsertnyy Kompleks'},
      {position: {lat: 59.8029103, lng: 30.267859},
       title: 'Pulkovo Airport'},
      {position: {lat: 59.9500063, lng: 30.316666},
       title: 'Peter and Paul Fortress'},
    ],
  }

  setMarkers = (exMarks) => {
    this.setState ({
      seenMarkers: exMarks,
    });
  }

  params = (markers) => {
    markers.map ((item) => {
      this.setState ((state) => {
        paramsFS: this.state.paramsFS.push({
          'title': item.title,
          'll': `${item.position.lat},${item.position.lng}`,
          'query': 'cafe',
          'limit': 3,
        });

        paramsFS2: this.state.paramsFS2.push({
          'title': item.title,
          'll': `${item.position.lat},${item.position.lng}`,
          'query': 'metro',
          'limit': 2,
        });

      })
    })
  }

    FS = (value, paramsFS, paramsFS2) => {
      paramsFS.map((item) => {
        if (item.title === value) {
        foursquare.venues.getVenues(item)
          .then ((res) => {
            this.setState({
              items: res.response.venues
            });
        })
        }
      },
      paramsFS2.map((item) => {
        if (item.title === value) {
        foursquare.venues.getVenues(item)
          .then ((res) => {
            this.setState({
              items2: res.response.venues
            });
        })
        }
      }),
      this.setState ({
        cafe: 'Nearest Cafes:',
        metro: 'Nearest Metro-station',
      })

    )
  }

  bindMap = (markers) => {
    let exMarks = [];

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
          center: {lat: 59.8809792, lng: 30.3191973},
          zoom: 11,
        });

        this.exMarks = [];

        markers.map((item) => {
          const marker = new window.google.maps.Marker({
            position: item.position,
            map: this.map,
            title: item.title,
            animation: window.google.maps.Animation.DROP,
          })

          this.exMarks = exMarks.push(marker);

          marker.addListener('click', () => {
            this.info = new window.google.maps.InfoWindow({
              content: item.title,
            });
            this.info.open(this.map, marker);
            this.FS(item.title, this.state.paramsFS, this.state.paramsFS2);
          });

        });
      this.setMarkers (exMarks);
    }).catch(error => {
      console.log ('Can not load Google map');
    });
  }

  componentDidMount() {
    this.bindMap(this.state.markers);
    this.params(this.state.markers);
  }

  animaMarker = (value) => {
    this.state.seenMarkers.map((item) => {
      if (value === item.title) {

        item.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(() => {item.setAnimation(null);}, 2500);

        this.FS(value, this.state.paramsFS, this.state.paramsFS2);
      };
    });
  }

  isEmpty = (res) => {
    let i = 0;
    res.forEach((elem) => {
      i++});
    if (i === 0) {
      this.setState ({
        empty: 'Sorry, no results, try again!'
      });
    } else {
        this.setState ({
          empty: ''
        });
      };
  }

  newList = (list) => {
    this.state.seenMarkers.map((item) => {
      item.setMap(null);
    });

    list.map((newItem) => {
      this.state.seenMarkers.map((item) => {
        if (newItem.title === item.title) {
          item.setMap(this.map);
        }
      })
    })
  }

  clearFS = () => {
    this.setState ({
      items: [],
      items2: [],
      cafe: '',
      metro: '',
    })
  }

  render() {
    return (
      <div className="App">
        <div className='container'>

          <header className="App-header box" role='Header'>
            <h1 className="App-title" tabIndex='1'>WELCOME to MY PLACES!</h1>
          </header>
          <Search markers={this.state.markers} newList={this.newList} animaMarker={this.animaMarker}
            isEmpty={this.isEmpty} empty={this.state.empty} clearFS={this.clearFS}/>
          <div className="map" id='map'/>

          <div className='box info' role='informationOfNearestCafes' tabIndex='20'>
            {this.state.cafe}
            {this.state.items.map((item) => {
              return (<div className='metro' tabIndex={indxCafe++} key={item.id}>{item.name}, {item.location.address}</div>)
            })}
          </div>

          <div className='box info' role='informationOfNearestMetroStation' tabIndex='25'>
            {this.state.metro}
            {this.state.items2.map((item) => {
              return (<div className='metro' tabIndex={indxMetro++} key={item.id}>{item.name}, {item.location.address}</div>)
            })}
          </div>

        </div>
      </div>
    );
  }
}

export default App;
