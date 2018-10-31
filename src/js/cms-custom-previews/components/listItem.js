import React from "react";

export default class ListItem extends React.Component {
  render() {
    const {number, text, image, color} = this.props;
    return <div>
      <div className="flex items-center justify-between">
        <div className="flex-1 flex pa5">
          <div className="mr4">
            <span className="f3 fw7 white br-100 dib w3 h3 flex items-center justify-center" style={{
              backgroundColor: color
            }}>
            { number }
            </span>
         </div>

         <div>{ text }</div>
        </div>

        { image &&
          <div className="flex-1">
            <img src={ image } className="w-100" />
          </div>
        }
      </div>
    </div>;
  }
}
