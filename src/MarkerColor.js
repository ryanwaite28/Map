import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';
//import DivIcon from 'react-leaflet-div-icon';
import iconRedUrl from './location-pointer-red.svg'
import iconBlueUrl from './location-pointer-blue.svg'
import './App.css';

const redIcon = new L.icon({
    iconUrl: iconRedUrl,
    //iconSize: [38, 95], // size of the icon
    //iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    //popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

const blueIcon = new L.icon({
    iconUrl: iconBlueUrl,
    //iconSize: [38, 95], // size of the icon
    //iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    //popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

/*delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

/*const myCustomColour = '#583470'

const markerHtmlStyles = `
  background-color: ${myCustomColour};
  width: 3rem;
  height: 3rem;
  display: block;
  left: -1.5rem;
  top: -1.5rem;
  position: relative;
  border-radius: 3rem 3rem 0;
  transform: rotate(45deg);
  border: 1px solid #FFFFFF`

const myIcon = L.Icon({
  className: "my-div-icon ",
  iconAnchor: [0, 24],
  labelAnchor: [-6, 0],
  popupAnchor: [0, -36],
  //html: `<span style="${markerHtmlStyles}" />`
})*/

class MarkerColor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [
        false,
      ]
    }
  }

  markerColor(index, event) {
    const color_states = this.state.colors;
    /*if(!event.ctrlKey){
      color_states = [
        false,
      ];
    }*/

    const is_selected = color_states[index];
    color_states[index] = !is_selected;
    this.setState({
      colors: color_states
    });
  }

  renderColors() {
    return this.state.colors.map((is_selected, index) => {
      let color_type = 'redIcon';
      if(is_selected){
        color_type = 'blueIcon';
      }
      return (
        <div
          key={index}
          onClick={this.markerColor.bind(this, index)}>
        </div>
      );
    });
  }

  render() {
    return(
      <div>
        {
          this.renderColors.call(this)
        }
      </div>
    );
  }
}

export default MarkerColor;
