import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './App.css';
import axios from 'axios';

//https://github.com/PaulLeCam/react-leaflet/issues/453
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

//https://github.com/PaulLeCam/react-leaflet/blob/master/example/components/simple.js
//https://www.youtube.com/watch?v=J7pFiXh-ydA

class App extends Component {
  state = {
    location: {
      lat: -7.6079,
      lng: 110.2038
    },
    zoom: 13,
    places: []
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

    return (
      <div className="main-wrap">
        <Map className="map" center={position} zoom={this.state.zoom}>
          <TileLayer
           attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
           />
           {this.state.places.map(place => (
             <Marker
              key={place.venue.id}
              position={[place.venue.location.lat, place.venue.location.lng]}>
              <Popup>
                <p className="place-name">{[place.venue.name]}</p>
                <p className="place-address">{[place.venue.location.formattedAddress]}</p>
                <p className="place-description">{[place.reasons.items[0].summary]}</p>
              </Popup>
            </Marker>
          ))}
        </Map>
      </div>
    );
  }
}

export default App;
