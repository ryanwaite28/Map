import React, {Component} from "react";
import './App.css';
import ListItem from './ListItem'
import axios from 'axios';

//https://www.carlrippon.com/react-drop-down-data-binding/

class DropDown extends Component {
  state = {
    places: [],
    /*selectedPlaces: '',
    validationError: '',*/
    searchQuery: 'all',
  };

  handleChange = (event) =>{
          //let choice = event.target.value;
          //this.props.filter(choice);
          //let places = this.props.places.filter(place => place.visible === true);
          this.setState({selectValue: event.target.value});
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

    //function to filter based on place category
    filter = (searchQuery) => {
      const map = this.state.map;
      const markers= this.state.markers;
      //clear map
      markers.forEach(marker => marker.setMap(null))

      const selectPlaces = this.state.places.map((place) => {
        if ((place.venue.categories[0].name === searchQuery) || (searchQuery === 'all')) {
          place.visible = true
        } else {
          place.visible = false
        }
        return place
      });

      this.setState({selectPlaces, searchQuery});
      this.setMarkers(map)
    };


  render() {
    const {selectPlaces} = this.props;
    return (
      <div className='drop-down-container'>
        <div className='drop-down'>
          <select className='drop-down-content' onChange={this.handleChange} defaultValue={this.state.selectValue}>
            <option value="All">All</option>
            <option value="Temple">Temple</option>
            <option value="Hotel">Hotel</option>
            <option value="Restaurant">Indonesia Restaurant</option>
            <option value="History Museum">History Museum</option>
            <option value="Rafting">Rafting</option>
          </select>

          <ul className="places-list">
            {
              this.state.places.map(place => (
                <ListItem selectPlaces={selectPlaces} />
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}


export default DropDown;
