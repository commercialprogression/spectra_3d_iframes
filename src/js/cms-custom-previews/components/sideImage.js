import React from "react";

export default class SideImage extends React.Component {
  render() {
    const {heading, text, image} = this.props;

    return <div className="flex ph5 items-center pv4">
      <div className="flex-1 pr5">
        <div className="f2 pb3">{ heading }</div>
        <div className="f9375 lh-copy">{ text }</div>
      </div>
      <div className="flex-1">
        <img src={ image } alt="" />
      </div>
    </div>;
  }
}
