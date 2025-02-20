import React from "react";
import "./SplashFooter.css";

export default function SplashFooter() {
  return (
    <div id="sp-ft-container">
      <div id="splash-footer-container">
        <div id="splash-footer-list">
          <a
            className="splash-footer-content"
            href=""
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
          <a
            className="splash-footer-content"
            href=""
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a className="splash-footer-content">Meet The Creator</a>
        </div>
      </div>
    </div>
  );
}
