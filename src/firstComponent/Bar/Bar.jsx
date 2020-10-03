import React, {Component} from 'react';
import { HuePicker } from 'react-color'; 

let SORTING_FINISH = "red";
let SORTING_VISITED = "lightgreen";
let SORTING_UNVISITED = "gold";

export default class BarComponent extends Component {

  handleUnvisitedChange(color){
    SORTING_UNVISITED = color.hex;
  }
  handleVisitedChange(color){
    SORTING_VISITED = color.hex;
  }
  handleFinishChange(color){
    SORTING_FINISH = color.hex;
  }


    render() {
        const {
          state
        } = this.props;
        return (
          <div style={{height:'600px', marginTop:'25px'}}>
            <div style={{alignItems:'center', placeContent:'center'}} className="row">Unvisited Item Color:<HuePicker color={ SORTING_UNVISITED } onChange={ this.handleUnvisitedChange }/></div>
            <div style={{alignItems:'center', placeContent:'center'}} className="row">Visited color:<HuePicker color={ SORTING_VISITED } onChange={ this.handleVisitedChange }/></div>
            <div style={{alignItems:'center', placeContent:'center'}} className="row">Final Color:<HuePicker color={ SORTING_FINISH } onChange={ this.handleFinishChange }/></div>
          {state.array.map((value, index) => (
          <div  className = "row"
            key={index}
            style={{
              backgroundColor: `${state.sorted?SORTING_FINISH:`${value.visited?SORTING_VISITED:SORTING_UNVISITED}`}`,
              height: `${value.number}px`,
              width:'5px',
              display: `inline-block`,
              margin: `0 1px`,
            }}></div>
        ))}

          </div>
        );
      }
}
