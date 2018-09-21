import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';
import './App.css';
import axios from 'axios';
import AppTitle from './AppTitle'
import iconRedUrl from './location-pointer-red.svg'
import iconBlueUrl from './location-pointer-blue.svg'

//https://github.com/PaulLeCam/react-leaflet/issues/453
//delete L.Icon.Default.prototype._getIconUrl;

/*L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});*/

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
  constructor () {
    super();
    this.state = {
      location: {
        lat: -7.6079,
        lng: 110.2038
      },
      zoom: 13,
      places: [],
      markers: [[-7,6079, 110.2038]],
    };
  }

  /*changeMarkerColor = (e) => {
    const {markers} = this.state
    e.target.setIcon(blueIcon);
    markers.push(e.marker);
    this.setState({markers});
    setTimeout(() => {
      this.setState({markers})
    }, 3000)
  }*/

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
              icon={blueIcon}
              onClick={(e) => {
               console.log(e);
               e.target.setIcon(redIcon);
               setTimeout(() => {
                 e.target.setIcon(blueIcon);
               }, 800);
             }}
              //onClick={this.changeMarkerColor}
              //MarkerColor={this.state.MarkerColor}
              >
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
