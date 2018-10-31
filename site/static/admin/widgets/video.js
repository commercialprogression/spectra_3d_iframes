
// Video widget.
const VideoControl = createClass({
  handleChange: function(e) {
    this.props.onChange(e.target.value);
  },

  render: function() {
    const value = this.props.value;

    return h("input", {
      type: "text",
      class: "nc-controlPane-widget",
      value: value,
      onChange: this.handleChange
    });
  }

});

// Video widget preview.
const VideoPreview = createClass({
  render: function() {
    return h("iframe", {
      id: "ytplayer",
      type: "text/html",
      width: "1024",
      height: "600",
      src: "https://www.youtube.com/embed/" + this.props.value,
      frameborder: "0"
    });
  }
});

CMS.registerWidget("video", VideoControl, VideoPreview);
