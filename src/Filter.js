import React, {Component} from "react";
import './App.css';
import axios from 'axios';


//https://www.youtube.com/watch?v=dAhMIF0fNpo
//https://egghead.io/lessons/react-use-map-to-create-react-components-from-arrays-of-data

class Filter extends Component {
  constructor () {
    super();
    this.state = {
      places: [],
    };
    this.filter = this.filter.bind(this);
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

  filter(e) {
    this.setState({filter: e.target.value})
  }

  placeClicked(placeId) {
   this.props.placeClicked(placeId)
 }

  render() {
    let places = this.state.places

    if(this.state.filter) {
      places = places.filter ( place =>
        place.venue.name.toLowerCase()
        .includes(this.state.filter.toLowerCase()))
    }


    return (
      <div className = 'side-container'>
        <input className = 'input-box'
         tabIndex="0"
         aria-label= "input-box"
         type='text'
         onChange={this.filter} />

        <div className = 'list-container'>
          {places.map(place =>
            <p className = 'list-places'
               tabIndex="0"
               role="link"
               key={place.venue.id}
               onClick={e=>this.placeClicked(place.venue.id)}
                >{place.venue.name}
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default Filter;
