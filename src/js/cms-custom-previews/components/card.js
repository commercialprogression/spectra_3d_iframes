import React from "react";

export default class Card extends React.Component {
  render() {
    return <div className="card-wrapper">
      <div href="#" className="pointer relative f1 z-1 white card justify-center flex items-center ph4 db no-underline h-100" style={{
        backgroundColor: "#F6A800"
      }}>
        Card
      </div>
    </div>;
  }
}
