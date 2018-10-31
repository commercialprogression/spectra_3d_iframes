import React from "react";

export default class timelineItem extends React.Component {
  render() {
    const {labelSmall, labelLarge, heading, subHeading, text, image, color} = this.props;

    return <div className="pv4 flex pl6">
      <div className="relative w4 tc fw5 bn bw2 br b--right--dotted flex" style={{
        color: color
      }}>

        {/* Labels */}
        <div className="pr3">
          <div className="f1875 ttu">
            { labelSmall }
          </div>
          <div className="f4375 tracked-tight">
            { labelLarge }
          </div>
        </div>
        <div className="absolute right-0 w1 h1 br-100 nr06" style={{
          backgroundColor: color
        }}></div>

      </div>

      {/* Text */}
      <div className="ph4 flex-1">
        <div className="f3 fw5">{ heading }</div>
        <div className="fw5">{ subHeading }</div>
        <div className="pt3">{ text }</div>
      </div>

      {/* Image */}
      <div className="flex-1">
        <img src={ image } alt="" />
      </div>

    </div>;
  }
}
