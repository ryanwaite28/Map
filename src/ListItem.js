import React, { Component } from 'react';
import './index.css';
import axios from 'axios';

class ListItem extends Component {

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
      });
    }

  openMarker = () => {
    const {map, place, marker, blueIcon, redIcon, Marker, Popup} = this.props;
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
    const {map, place, marker, blueIcon, redIcon, Marker, Popup} = this.props;

    return (
      <li className="list-item" tabIndex="2" onClick={this.openMarker}>
        <Marker>
          <Popup>
            <p className="place-name">{[place.venue.name]}</p>
          </Popup>
        </Marker>
      </li>
    )
  }
}

export default ListItem;
