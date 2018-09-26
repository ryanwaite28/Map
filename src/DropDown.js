import React, {Component} from "react";
import './App.css';
import axios from 'axios';
import PropTypes from 'prop-types'

//https://www.carlrippon.com/react-drop-down-data-binding/
//https://www.youtube.com/watch?v=dAhMIF0fNpo



class DropDown extends Component {
  constructor (props) {
    super(props);
    this.state = {
      places: [],
      selectedPlaces: '',
    //validationError: '',*/
    //searchQuery: 'all',
    };
  }

    /*static propTypes = {
      places: PropTypes.arrayOf(PropTypes.object),
      onChange: PropTypes.func.isRequired
    }

    handleChange = (category) => this.props.onChange(category);*/

    componentDidMount() {
      this.getPlaces()
    }

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
    const {places} = this.props;
    /*const categoryArray =['all'];

      this.state.places.map(place => {
        place.category.map(category => {
          if (categoryArray.indexOf(category) < 0) {
            categoryArray.push(category);
            }
          });
        });*/

    return (
      <div className='drop-down-container'>
        <div className='drop-down'>
            <select className='drop-down-content' value={this.state.selectedPlaces}
                    onChange={(e) => this.setState ({selectedPlaces: e.target.value})}>
             //{this.state.places.map((place) => <option key={place.venue.id} venue={place.venue}>{place.venue.categories[0].name}</option>)}
             {this.setState({
            places: places.filter((allPlaces, idx, places) => places.map(singlePlace => singlePlace.venue.categories[0].name).indexOf(allPlaces.venue.categories[0].name) === idx)
          })}>
              </select>
        </div>
      </div>
    );
  }
}


export default DropDown;
