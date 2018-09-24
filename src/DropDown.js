import React, {Component} from "react";
import axios from 'axios';
import './App.css';

class DropDown extends Component {
  state = {
    places: [],
    selectedPlaces: '',
    validationError: ''
  };

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

  render() {
    return (
      <div className='drop-down-container'>
       <select className='drop-down-content' value={this.state.selectedPlaces}
               onChange={(e) => this.setState({selectedPlaces: e.target.value, validationError: e.target.value === '' ? 'You must select a place' : ''})}>
        {this.state.places.map((place) => <option key={place.venue.id} value={place.venue.categories[0].name}>{place.venue.categories[0].name}</option>)}
        </select>
        <div style={{color: 'red', marginTop: '5px'}}>
         {this.state.validationError}
         </div>
      </div>
    );
  }
}


export default DropDown;
