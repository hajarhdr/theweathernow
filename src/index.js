import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import WebFont from "webfontloader";

WebFont.load({
  google: {
    families: [
      "Great Vibes:400",
      "Sansita:regular,italic,700,700italic,800,800italic,900,900italic",
    ],
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
