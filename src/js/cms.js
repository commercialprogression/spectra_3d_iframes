import React from "react";
import CMS from "netlify-cms";

//  Previews
import LandingPagePreview from "./cms-custom-previews/landing-page";
import CardPreview from "./cms-custom-previews/card";

// Widgets
import VideoControl from "./cms-custom-widgets/videoControl";
import VideoPreview from "./cms-custom-widgets/videoPreview";

// Styles, widgets, and previews...oh my!
CMS.registerPreviewStyle("/css/main.css");
CMS.registerWidget("video", VideoControl, VideoPreview);
CMS.registerPreviewTemplate("landing-page", LandingPagePreview);
CMS.registerPreviewTemplate("card", CardPreview);
