
import React from "react";

export default class VideoPreview extends React.Component {
  render() {
    return <iframe
      id="ytplayer"
      type="text/html"
      width="1024"
      height="600"
      src={"https://www.youtube.com/embed/" + this.props.value}
      frameborder="0"
    />;
  }
}
