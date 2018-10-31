
import React from "react";

export default class VideoControl extends React.Component {
  render() {
    return <input
      type="text"
      className="nc-controlPane-widget"
      value={this.props.value}
      onChange={(e) => this.props.onChange(e.target.value)}
    />;
  }
}
