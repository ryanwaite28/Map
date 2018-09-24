import React, { Component } from 'react';
import './index.css';

class SideItem extends Component {
  openMarker = () => {
    const {map, place, marker, blueIcon, redIcon, Marker, Popup} = this.props;
    map.panTo(marker.getPosition());
    <Marker
     key={place.venue.id}
     position={[place.venue.location.lat, place.venue.location.lng]}
     icon={blueIcon}
     onClick={(e) => {
      console.log(e);
      e.target.setIcon(redIcon);
      setTimeout(() => {
        e.target.setIcon(blueIcon);
      }, 1500);
    }}
    >
     <Popup>
       <p className="place-name">{[place.venue.name]}</p>
       <p className="place-address">{[place.venue.location.formattedAddress]}</p>
       <p className="place-category">{[place.venue.categories[0].name]}</p>
     </Popup>
   </Marker>
  }

  render() {
    const {marker} = this.props;
    const {place} = this.props;

    return (
      <li className="side-item" tabIndex="2" onClick={this.openMarker}>
        <p>{[place.venue.name]}</p>
      </li>
    )
  }
}

export default SideItem;
