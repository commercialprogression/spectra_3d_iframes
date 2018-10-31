import React from "react";

export default class Video extends React.Component {
  render() {
    const {image, heading, subheading, text} = this.props;

    return <div>

      { image &&
        <div className="h520 white flex justify-center flex-column cover bg-center" style={{
          backgroundImage: image && `url(${image})`
        }}>
        <div className="mw6 center" id="video-wrapper">
          <div className="tc f225">{ heading }</div>
          <div className="tc f1 pb2">{ subheading }</div>
          <div className="tj pb3 lh-copy">{ text }</div>
          <span href="#" className="db tc no-underline" id="video-play">
            <img className="pb2" src="/img/play.svg" alt="play video"/>
            <div className="white">Play Video</div>
          </span>
        </div>
      </div>
    }
    </div>;
  }
}

