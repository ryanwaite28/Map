import React, {Component} from 'react';
import './index.css'
//import SideItem from './SideItem';

class SideBar extends Component {
  /*changeOption = (event) =>{
    let choice = event.target.value;
    this.props.filter(choice);
    let places = this.props.places.filter(place => place.visible === true);
    this.setState({places});
  };*/

  render() {
    //const {map, places, markers, searchQuery} = this.props;
    return (
      /*<div className='side-bar-container'>
        <div className="side-bar">
          <select name="filter-options" tabIndex="1" onChange={this.changeOption} defaultValue={searchQuery} aria-label="Filter markers by category">
            <option value="all">All</option>
            <option value="temple">Temple</option>
            <option value="hotel">Hotel</option>
            <option value="restaurant">Restaurant</option>
            <option value="resort & spa">Resort & Spa</option>
            <option value="church">Church</option>
          </select>

          <ul className="location-list">
            {
              markers.map(marker => (
                <SideItem  map={map} places={places} marker={marker} markers = {markers} />
              ))
            }
          </ul>
        </div>
      </div>*/
    )
  }
}

export default SideBar;
