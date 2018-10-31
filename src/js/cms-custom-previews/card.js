// Dependencies
import React from "react";

import Tip from "./components/tip";
import SideImage from "./components/sideImage";
import List from "./components/list";
import Timeline from "./components/timeline";
import Video from "./components/video";

// Card component class
export default class CardPreview extends React.Component {
  render() {
    let listItems = false;
    let timelineItems = false;

    const {entry, widgetFor, widgetsFor, getAsset} = this.props;
    const title = entry.getIn(["data", "title"]);
    const color = entry.getIn(["data", "color"]);
    const heading = entry.getIn(["data", "heading"]);
    const tip = entry.getIn(["data", "tip"]);
    const sideImage = entry.getIn(["data", "side_image"]);
    const sideImageHeading = entry.getIn(["data", "side_image", "heading"]);
    const sideImageText = widgetsFor("side_image").getIn(["widgets", "text"]);
    const sideImageImage = getAsset(entry.getIn(["data", "side_image", "image"]));
    const list = entry.getIn(["data", "list"]);
    const timeline = entry.getIn(["data", "timeline"]);
    const video = entry.getIn(["data", "video"]);

    let videoImage = getAsset(entry.getIn(["data", "video", "image"]));

    // Hack to get the relative path of the image for use as a background.
    if (videoImage && !videoImage.fileObj) {
      videoImage = window.parent.location.protocol + "//" + window.parent.location.host + videoImage;
    }

    // Determine if we have list items and timeline items.
    list ? listItems = list.get("listitems") : "";
    timeline ? timelineItems = timeline.get("timelineitems") : "";

    return <div className="f1125 w1024 center gotham fw3 f9375 scorpion">

      {/* Title bar */}
      <div className="relative card-full-title white pa3 flex items-center justify-between" style={{
        backgroundColor: color
      }}>
        <div className="f4">{ title }</div>

        <div className="card-close flex items-center pointer">
          <span className="pr2">close</span>
          <img src="/img/close.svg" alt="close card" />
        </div>
      </div>

      {/* Video */}
      { video &&
        <Video
          image = { videoImage }
          heading = { entry.getIn(["data", "video", "heading"]) }
          subheading = { entry.getIn(["data", "video", "subheading"]) }
          text = { entry.getIn(["data", "video", "text"]) }
        />
      }

      {/* Heading */}
      { heading &&
        <div class="pv4 ph5">
          <div>{ heading }</div>

          <div className="flex items-center justify-between pt2">
            <div>{ widgetFor("body") }</div>

            { tip &&
              <Tip
                tip = { tip }
                color = { color }
              />
            }
          </div>
        </div>
      }

      {/* Side Image */}
      { sideImage &&
        <SideImage
          heading = { sideImageHeading }
          text = { sideImageText }
          image = { sideImageImage }
        />
      }

      {/* List */}
      { list && listItems &&
        <List
          list = { list }
          getAsset = { getAsset }
          color = { color }
        />
      }

      {/* Timeline */}
      { timeline && timelineItems &&
        <Timeline
          timeline = { timeline }
          getAsset = { getAsset }
          color = { color }
        />
      }
    </div>;
  }
}

