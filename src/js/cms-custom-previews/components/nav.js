import React from "react";

export default class Nav extends React.Component {
  render() {
    return <div>
      <div className="flex items-center justify-between pa3">
        <div className="flex items-center">
          <button className="hamburger hamburger--elastic" type="button" aria-label="Menu" aria-controls="navigation" id="hamburger">
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
        </div>

        <nav>
          <ul className="ttu list flex justify-around pl0">
            <li className="ph3">
              <span href="" className="b--sea-buckthorn pa3 no-underline scorpion">Link</span>
            </li>
            <li className="ph3">
              <span href="" className="b--sea-buckthorn pa3 no-underline scorpion">Link</span>
            </li>
            <li className="ph3">
              <span href="" className="b--sea-buckthorn pa3 no-underline scorpion">Link</span>
            </li>
            <li className="ph3">
              <span href="" className="b--sea-buckthorn pa3 no-underline scorpion">Link</span>
            </li>
          </ul>
        </nav>

        <img src="/img/logo.svg" alt="logo" classNameName="fr" />
      </div>
    </div>;
  }
}
