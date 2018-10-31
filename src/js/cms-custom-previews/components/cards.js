import React from "react";
import Card from "./card";

export default class Cards extends React.Component {
  render() {
    const {cards} = this.props;
    const cardElements = [];

    for (let i = 0; i < cards.size; i++) {
      cardElements.push(<Card />);
    }

    return <div>
      <div className = {"bg-white card-grid-container h520 relative cards-" + cards.size}>
        { cardElements }
      </div>
    </div>;
  }
}
