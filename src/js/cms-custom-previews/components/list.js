//  Dependencies
import React from "react";

// Components
import ListItem from "./listItem";

export default class List extends React.Component {
  render() {
    const {list, getAsset, color} = this.props;
    const heading = list.get("heading");
    const text = list.get("text");
    const items = list.get("listitems");

    const listItems = items.map((item, index) => {
      const text = item.getIn(["item", "text"]);
      const image = getAsset(item.getIn(["item", "image"]));
      const number = index + 1;

      return <ListItem
        key = { index }
        number = { number }
        text = { text }
        image = { image }
        color = { color }
      />;

    });

    return <div>
      { heading &&
        <div className="tc mw6 pb4 center pt4">
          <div className="f2 pb3">{ heading }</div>
          <div>{ text }</div>
        </div>
      }
      
      <div>{ listItems }</div>
    </div>;
  }
}
