// Dependencies
import React from "react";

// Components
import Nav from "./components/nav";
import Video from "./components/video";
import Cards from "./components/cards";

// Build out landing page class.
export default class LandingPagePreview extends React.Component {
  render() {
    const {entry, getAsset} = this.props;
    const video = entry.getIn(["data", "video"]);
    const cards = entry.getIn(["data", "cards"]).size;

    let image = getAsset(entry.getIn(["data", "video", "image"]));

    // Hack to get the relative path of the image for use as a background.
    if (image && !image.fileObj) {
      image = window.parent.location.protocol + "//" + window.parent.location.host + image;
    }

    return <div className="w1024 center gotham fw3 f9375 scorpion">
      <div id="landing-page">

        <Nav />

        { video &&
          <Video
            image = { image }
            heading = { entry.getIn(["data", "video", "heading"]) }
            subheading = { entry.getIn(["data", "video", "subheading"]) }
            text = { entry.getIn(["data", "video", "text"]) }
          />
        }

        { cards > 0 &&
          <Cards
            cards = { entry.getIn(["data", "cards"]) }
          />
        }

      </div>
    </div>;
  }
}
