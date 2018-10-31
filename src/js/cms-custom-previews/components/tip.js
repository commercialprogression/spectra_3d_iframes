import React from "react";

export default class Tip extends React.Component {
  render() {
    const {tip, color} = this.props;

    return <div className="w-50">
      <div className="mw5 fr relative mt4">
        <span className="f1875 white pa1 absolute top--2 left--2" style={{
          backgroundColor: color
        }}>Tip</span>

        <div style="border-color: {{ $color }}" className="f8125 lh-copy ba pa3" style={{
          borderColor: color
        }}>{ tip }</div>
        
      </div>
    </div>;
  }
}
