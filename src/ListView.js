/*import React, {Component} from "react";
import {List, Autosizer} from "react-virtualized";

class ListView extends React.Component {
  renderRow = ({index, isScrolling, key, style}) => {
    return(
      <div key={key} style=(style)>
        <div>{this.props.places[index]}
      </div>
    )
  }
  render() {
    return (
      <Autosizer>
      {
        ({width, height}) => {
          return <List
            rowCount={this.props.places.length}
            width={width}
            height={height}
            rowHeight={50}
            rowRenderer={this.renderRow}
          />
        }
      }
      </Autosizer>
    )
  }
}


export default ListView;*/
