import React from "react";

import TimelineItem from "./timelineItem";

export default class Timeline extends React.Component {
  render() {
    const {timeline, getAsset, color} = this.props;
    const heading = timeline.get("heading");
    const text = timeline.get("text");
    const items = timeline.get("timelineitems");

    const timelineItems = items.map((item, index) => {
      const labelSmall = item.getIn(["item", "timeline_label_small"]);
      const labelLarge = item.getIn(["item", "timeline_label_large"]);
      const heading = item.getIn(["item", "heading"]);
      const subHeading = item.getIn(["item", "sub_heading"]);
      const text = item.getIn(["item", "text"]);
      const image = getAsset(item.getIn(["item", "image"]));

      return <TimelineItem
        key = { index }
        labelSmall = { labelSmall }
        labelLarge = { labelLarge }
        heading = { heading }
        subHeading = { subHeading }
        text = { text }
        image = { image }
        color = { color }
      />;
    });

    return <div>

      {/* Heading */}
      { heading &&
        <div className="tc pb4 w-80 center pt4">
          <div className="f2 pb3">{ heading }</div>
          <div>{ text }</div>
      </div>
      }

      {/* Timeline items */}
      <div className="bg-near-white">
        { timelineItems }
      </div>
    </div>;
  }
}
