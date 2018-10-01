import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './App.css';
import axios from 'axios';
import AppTitle from './AppTitle'
import iconRedUrl from './location-pointer-red.svg'
import iconBlueUrl from './location-pointer-blue.svg'
import Filter from './Filter'

const redIcon = L.icon({
    iconUrl: iconRedUrl,
    iconSize: [38, 95], // size of the icon
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

const blueIcon = L.icon({
    iconUrl: iconBlueUrl,
    iconSize: [38, 95], // size of the icon
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

//https://github.com/PaulLeCam/react-leaflet/blob/master/example/components/simple.js
//https://www.youtube.com/watch?v=J7pFiXh-ydA

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      map: {},
      location: {
        lat: -7.6079,
        lng: 110.2038
      },
      zoom: 13,
      places: [],
    };
  }

  placeClicked = (placeId) => {
      let places = this.state.places;
      places.forEach(place => {
          if(placeId === place.venue.id) {
              console.log('match at place' + place.venue.name)
              place.placeClicked = true;
          } else {
              place.placeClicked = false;
          }
      });
      this.setState({places});
    }

  componentDidMount() {
    this.getPlaces()
  }


  //https://www.youtube.com/watch?v=dAhMIF0fNpo
  getPlaces = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "POKXMHQJY0EHTRGZEPMVWPJDWMUTSVRRINJILUSE5WZTSTUI",
      client_secret: "N4QKO4TTH4QKBFQ3SBYHUTQ5RUWMGAZ0B5JDYUE0H3V2W151",
      section: "nextVenues",
      near: "Borobudur",
      limit: "10",
      v: "20180725"
    }
    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        console.log(response.data.response.groups[0].items)
        this.setState({
          places: response.data.response.groups[0].items
        })
      })
      .catch(error => {
        console.log("Error!" + error)
      })
    }

  render() {
    const position = [this.state.location.lat, this.state.location.lng];
    //let shown ={ display: this.state.shown ? 'block' : 'none'};
    //let hidden = { display: this.state.shown ? 'none' : 'block'}

    return (
      <div className="main-wrap">
        <AppTitle />
        <Map className="map"
          center={position}
          zoom={this.state.zoom}

          >
          <TileLayer
           attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
           />

           {this.state.places.map(place => (
             <Marker

              key={place.venue.id}
              position={[place.venue.location.lat, place.venue.location.lng]}
              icon={place.placeClicked ? redIcon : blueIcon}
                    zIndexOffset={place.placeClicked ? 10000 : 0}
              onClick={(e) => {
               console.log(e);
               e.target.setIcon(redIcon);
               setTimeout(() => {
                 e.target.setIcon(blueIcon);
               }, 1500);
             }}
             >
              <Popup>
              {this.state.placeClicked && <p>{place.venue.location.address}</p>}
                <p className="place-name">{[place.venue.name]}</p>
                <p className="place-address">{[place.venue.location.address]}</p>
                <p className="place-category">{[place.venue.categories[0].name]}</p>
              </Popup>
            </Marker>
          ))}
        </Map>
        <Filter placeClicked={this.placeClicked.bind (this.placeId)}>
        </Filter>
      </div>
    );
  }
}
export default App;
