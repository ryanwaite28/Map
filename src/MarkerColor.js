import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import iconRedUrl from './location-pointer-red.svg'
import iconBlueUrl from './location-pointer-blue.svg'

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
}

export default MarkerColor;
